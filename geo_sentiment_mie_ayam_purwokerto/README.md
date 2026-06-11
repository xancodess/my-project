# Geo Sentiment Mie Ayam Purwokerto

Project ini menganalisis sentimen ulasan mie ayam di area Purwokerto berbasis teks dan lokasi. Versi terbaru memakai notebook `geo_sentiment_undersampling.ipynb` dengan model utama **non-pretrained**: TF-IDF word/character n-gram + model linear klasik, terutama `LinearSVC` terkalibrasi.

IndoBERT pada project ini dipakai sebagai **automatic labeler/pseudo-labeler** untuk mengubah teks ulasan menjadi label sentimen. Model utama yang dilatih, dievaluasi, dan dipakai untuk preview/peta adalah model non-pretrained.

## Fokus Eksperimen Terbaru

Notebook utama:

```text
geo_sentiment_undersampling.ipynb
```

Fokus pipeline:

1. Load dataset mentah dari `dataset/raw/all_platforms_raw.csv`.
2. Load dataset eksternal/testing dari `dataset/raw/test_data_ulasan_mie_ayam.csv`.
3. Preprocessing teks Bahasa Indonesia untuk fitur ML dan input labeler.
4. Pseudo-labeling sentimen menggunakan IndoBERT.
5. Drop kelas netral agar task menjadi binary: `0 = Negatif`, `1 = Positif`.
6. Split eksternal anti-leakage: data April-Juni 2026 diperlakukan sebagai validation/testing eksternal.
7. Random undersampling hanya pada train set.
8. Training dan model search non-pretrained dengan TF-IDF.
9. Threshold tuning untuk menyeimbangkan Macro-F1, Recall Negatif, Precision, dan Accuracy.
10. Evaluasi model, error analysis, preview testing, dan visualisasi spasial.

## Kenapa Non-Pretrained

Dataset project ini adalah ulasan teks pendek, domain lokal, dan sangat imbalanced. Model non-pretrained dipilih agar:

- tidak bergantung pada fine-tuning transformer sebagai model utama,
- lebih ringan dan cepat dilatih,
- cocok untuk fitur sparse TF-IDF,
- mudah diaudit melalui token/ngram penting,
- tetap kuat untuk teks pendek informal seperti ulasan Google Maps.

Model terbaik di eksperimen terbaru adalah keluarga:

```text
Calibrated LinearSVC + TF-IDF word n-gram + TF-IDF character n-gram + class_weight + threshold tuning
```

## Dataset

Dataset utama:

```text
dataset/raw/all_platforms_raw.csv
dataset/raw/test_data_ulasan_mie_ayam.csv
```

Ringkasan dataset dari eksperimen terbaru:

| Dataset | Keterangan |
| --- | --- |
| `all_platforms_raw.csv` | Dataset mentah utama untuk train pool |
| `test_data_ulasan_mie_ayam.csv` | Dataset eksternal April-Juni 2026 untuk validation/testing dan preview peta |
| `review_text` | Kolom utama untuk preprocessing, labeling, dan training |
| `lat`, `lon` | Kolom koordinat untuk geo-spatial analysis |
| `review_rating` | Tersedia sebagai metadata, tetapi bukan ground truth sentimen utama |

Label sentimen tidak diambil langsung dari rating. Label binary dibuat dari teks ulasan menggunakan IndoBERT sebagai labeler otomatis, lalu kelas netral dibuang.

## Distribusi Data Binary

Hasil split eksternal setelah preprocessing, deduplikasi, pseudo-labeling IndoBERT, dan drop netral:

| Split | Jumlah | Negatif | Positif |
| --- | ---: | ---: | ---: |
| Train | 2.826 | 428 | 2.398 |
| Validation | 157 | 16 | 141 |
| Test | 158 | 17 | 141 |

Karena train set sangat imbalanced, notebook membuat random undersampling train-only:

| Label | Sebelum | Sesudah | Aksi |
| --- | ---: | ---: | --- |
| Negatif | 428 | 428 | kept all minority |
| Positif | 2.398 | 428 | undersampled |

Validation dan test tetap natural agar evaluasi lebih realistis.

## Model Non-Pretrained

Kandidat model yang diuji pada notebook:

- `LogisticRegression` + TF-IDF word+char
- `LinearSVC` + `CalibratedClassifierCV` + TF-IDF word+char
- `SGDClassifier(loss="log_loss")` + TF-IDF word+char
- `ComplementNB` + TF-IDF word
- `MLPClassifier` dari nol + TF-IDF word

Fitur utama:

- word TF-IDF n-gram `(1, 3)`
- character TF-IDF `char_wb` n-gram `(3, 6)`
- `class_weight` atau `sample_weight`
- threshold tuning dari validation set

## Hasil Model Terbaik

Model utama final yang dipakai pada output evaluasi dan preview testing:

```text
OPT LinearSVC calibrated TF-IDF word+char + natural_80pct + class_weight + balanced_threshold
```

Hasil test:

| Metrik | Nilai |
| --- | ---: |
| Accuracy | 0.9494 |
| Precision Negatif | 0.7368 |
| Recall Negatif | 0.8235 |
| Recall Positif | 0.9645 |
| Macro-F1 | 0.8746 |
| Weighted-F1 | 0.9506 |
| ROC-AUC | 0.9691 |
| Threshold | 0.60 |

Varian alternatif yang lebih sensitif terhadap kelas negatif:

```text
OPT LinearSVC calibrated TF-IDF word+char + rus_1_3 + class_weight + balanced_threshold
```

| Metrik | Nilai |
| --- | ---: |
| Accuracy | 0.9430 |
| Precision Negatif | 0.6667 |
| Recall Negatif | 0.9412 |
| Recall Positif | 0.9433 |
| Macro-F1 | 0.8739 |
| ROC-AUC | 0.9720 |
| Threshold | 0.59 |

Untuk project geo sentiment, metrik yang paling diprioritaskan adalah **Macro-F1** dan **Recall Negatif**, karena kelas negatif merepresentasikan sinyal keluhan/lokasi bermasalah.

## Struktur Folder Utama

```text
geo_sentiment_mie_ayam_purwokerto/
|-- dataset/
|   |-- raw/
|   |   |-- all_platforms_raw.csv
|   |   `-- test_data_ulasan_mie_ayam.csv
|   `-- processed/
|       `-- all_platforms_preprocessed.csv
|-- output/
|   `-- geo_sentiment_undersampling/
|       |-- all_platforms_text_processing_labeling.xlsx
|       |-- split_external_80_10_10_audit.csv
|       |-- train_undersampling_audit.csv
|       |-- train_labeled_binary_undersampled.csv
|       |-- val_labeled_binary_natural.csv
|       |-- test_labeled_binary_natural.csv
|       |-- nonpretrained_model_search_all_candidates.csv
|       |-- nonpretrained_top5_model_comparison.csv
|       |-- model_evaluation_all_models_comparison.csv
|       |-- model_evaluation_extended_metrics.csv
|       |-- model_fit_overfit_underfit_diagnosis.csv
|       |-- testing_predictions_apr_jun_2026_full.csv
|       |-- testing_prediction_preview_apr_jun_2026.csv
|       |-- testing_weekly_distribution_apr_jun_2026.csv
|       |-- mie_ayam_spatial_overview_heatmap_markers.html
|       `-- mie_ayam_spatial_sentiment_weekly_navigator.html
|-- geo_sentiment_undersampling.ipynb
|-- requirements_geo_sentiment_fix.txt
`-- README.md
```

## Output Penting

Output labeling dan split:

- `all_platforms_text_processing_labeling.xlsx`
- `train_pool_labeled_external_split.csv`
- `external_holdout_labeled_apr_jun_2026.csv`
- `split_external_80_10_10_audit.csv`
- `train_undersampling_audit.csv`
- `train_labeled_binary_undersampled.csv`
- `val_labeled_binary_natural.csv`
- `test_labeled_binary_natural.csv`

Output model non-pretrained:

- `nonpretrained_model_search_all_candidates.csv`
- `nonpretrained_top5_model_comparison.csv`
- `model_evaluation_all_models_comparison.csv`
- `model_fit_overfit_underfit_diagnosis.csv`
- `model_evaluation_extended_metrics.csv`
- `prediction_confidence_summary.csv`
- `prediction_confidence_audit.csv`

Output visual evaluasi:

- `split_distribution_binary.png`
- `eda_text_length_analysis.png`
- `eda_wordcloud_by_class.png`
- `eda_top_words_by_class.png`
- `confusion_matrix_indobert_opt.png`
- `threshold_tuning_recall_neg.png`
- `roc_pr_indobert_opt.png`
- `model_evaluation_extended_dashboard.png`

Output preview testing dan spatial:

- `testing_predictions_apr_jun_2026_full.csv`
- `testing_prediction_preview_apr_jun_2026.csv`
- `testing_prediction_preview_apr_jun_2026.xlsx`
- `testing_weekly_distribution_apr_jun_2026.csv`
- `testing_weekly_distribution_apr_jun_2026.png`
- `spatial_overview_location_summary.csv`
- `spatial_overview_weekly_apr_jun_summary.csv`
- `mie_ayam_spatial_overview_heatmap_markers.html`
- `mie_ayam_spatial_sentiment_weekly_navigator.html`

Catatan: beberapa file visual masih memakai nama `indobert_opt` karena berasal dari nama cell/output lama. Pada eksperimen terbaru, isi evaluasinya merujuk ke model utama non-pretrained dari `ALL_RESULTS`.

## Prasyarat

- Python 3.10 atau lebih baru
- pip
- Jupyter Notebook atau JupyterLab
- Koneksi internet saat pertama kali menginstal package dan mengunduh model IndoBERT labeler dari Hugging Face
- Opsional: GPU NVIDIA untuk mempercepat pseudo-labeling IndoBERT

Jika memakai `transformers` versi baru, gunakan PyTorch yang cukup baru. Notebook menyarankan `torch>=2.6` untuk menghindari masalah saat memuat model `.bin` dengan kombinasi Transformers terbaru.

## Cara Setup

Masuk ke folder project:

```bash
cd geo_sentiment_mie_ayam_purwokerto
```

Buat virtual environment:

```bash
python -m venv .venv
```

Aktifkan virtual environment.

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Command Prompt:

```cmd
.\.venv\Scripts\activate.bat
```

macOS atau Linux:

```bash
source .venv/bin/activate
```

Upgrade pip:

```bash
python -m pip install --upgrade pip setuptools wheel
```

Install dependency:

```bash
pip install -r requirements_geo_sentiment_fix.txt
```

Tambahkan environment ke Jupyter kernel:

```bash
python -m ipykernel install --user --name geo-sentiment-mie-ayam --display-name "Python (Geo Sentiment Mie Ayam)"
```

## Cara Menjalankan Notebook

Jalankan Jupyter:

```bash
jupyter notebook
```

Buka:

```text
geo_sentiment_undersampling.ipynb
```

Pilih kernel:

```text
Python (Geo Sentiment Mie Ayam)
```

Jalankan cell dari atas ke bawah. Secara umum notebook akan:

1. memuat dependency dan konfigurasi,
2. membaca dataset mentah,
3. melakukan preprocessing teks,
4. melakukan pseudo-labeling IndoBERT,
5. membuat split eksternal dan undersampling train-only,
6. melakukan EDA,
7. melakukan model search non-pretrained,
8. mengevaluasi model terbaik,
9. membuat preview testing April-Juni 2026,
10. menghasilkan peta dan ringkasan spatial.

## Dependency Utama

Kategori dependency:

- Data science: `numpy`, `pandas`, `scikit-learn`, `scipy`, `matplotlib`, `seaborn`, `tqdm`
- NLP preprocessing: `nltk`, `Sastrawi`, `wordcloud`
- Labeler IndoBERT: `torch`, `transformers`, `accelerate`, `safetensors`, `sentencepiece`, `sacremoses`, `protobuf`
- Output Excel: `openpyxl`, `xlsxwriter`
- Spatial visualization: `folium`
- Notebook: `jupyter`, `notebook`, `ipykernel`, `ipywidgets`

`geopandas`, `shapely`, `pyproj`, dan `pyogrio` tidak dominan di notebook terbaru, tetapi tetap disediakan sebagai dependency opsional karena project memiliki artefak dan pengembangan spatial analysis.

## Catatan GitHub

File yang paling penting untuk dipush:

- `geo_sentiment_undersampling.ipynb`
- `README.md`
- `requirements_geo_sentiment_fix.txt`
- `dataset/raw/all_platforms_raw.csv`
- `dataset/raw/test_data_ulasan_mie_ayam.csv`
- output utama di `output/geo_sentiment_undersampling/`

File yang sebaiknya tidak dipush:

- `.ipynb_checkpoints/`
- `backup/`
- `logs/`
- file duplikat dataset di root
- model transformer besar kecuali memakai Git LFS atau release artifact

## Troubleshooting

Jika install package gagal:

```bash
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements_geo_sentiment_fix.txt
```

Jika Jupyter tidak menemukan kernel:

```bash
python -m ipykernel install --user --name geo-sentiment-mie-ayam --display-name "Python (Geo Sentiment Mie Ayam)"
```

Jika IndoBERT labeler gagal load karena kombinasi `torch` dan `transformers`:

```bash
python -m pip install -U "torch>=2.6"
```

Jika memakai CUDA, instal PyTorch sesuai versi CUDA dari dokumentasi resmi PyTorch, lalu install dependency lainnya.

Jika file peta HTML tidak tampil sempurna, buka dengan browser modern seperti Chrome, Edge, atau Firefox.

## Catatan Metodologi

Project ini tidak memakai rating sebagai sumber label utama. Rating disimpan sebagai metadata, sedangkan label sentimen diperoleh dari teks ulasan menggunakan IndoBERT sebagai pseudo-labeler. Oleh karena itu, hasil model non-pretrained sebaiknya dijelaskan sebagai model yang belajar dari pseudo-label berbasis teks, bukan dari rating bintang.

## Author

Project ini dibuat sebagai bagian dari portfolio data science dan machine learning untuk analisis sentimen geospasial ulasan kuliner lokal.
