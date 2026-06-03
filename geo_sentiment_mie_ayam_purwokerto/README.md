# Load Model IndoBERT (Menghemat Waktu)
https://drive.google.com/drive/folders/1QkCXmD7vw1KJ5qsifIK9MGYxT_vttVJn?usp=sharing
1. download folder geo_sentiment_fix
2. selesai download, copy dan masukan ke folder ini.

# Geo Sentiment Mie Ayam Purwokerto

Project analisis sentimen berbasis lokasi untuk ulasan mie ayam di area Purwokerto. Project ini menggabungkan preprocessing teks Bahasa Indonesia, fine-tuning IndoBERT untuk klasifikasi sentimen, evaluasi model, audit error, serta visualisasi spasial berbasis peta interaktif.

README ini ditujukan untuk kebutuhan portfolio dan dokumentasi teknis agar project dapat dijalankan ulang secara terstruktur.

## Ringkasan Project

Tujuan utama project ini adalah mengidentifikasi pola sentimen ulasan pelanggan berdasarkan lokasi usaha mie ayam. Hasil analisis dapat digunakan untuk melihat lokasi dengan sentimen positif tinggi, lokasi dengan keluhan dominan, serta sebaran review pada level lokasi dan kecamatan.

Pipeline utama:

1. Mengumpulkan dan menyiapkan data ulasan dari dataset mentah.
2. Membersihkan teks dan melakukan preprocessing Bahasa Indonesia.
3. Melakukan eksplorasi data teks dan distribusi sentimen.
4. Melatih model IndoBERT untuk klasifikasi sentimen positif dan negatif.
5. Mengoptimalkan threshold model untuk meningkatkan recall kelas negatif.
6. Mengevaluasi performa model dengan metrik klasifikasi.
7. Membuat ringkasan spasial dan peta sentimen interaktif.

## Teknologi yang Digunakan

- Python
- Jupyter Notebook
- pandas, numpy, scikit-learn
- matplotlib, seaborn, wordcloud
- NLTK dan Sastrawi untuk preprocessing Bahasa Indonesia
- PyTorch, Transformers, IndoBERT
- folium, geopandas, shapely, pyproj, pyogrio untuk visualisasi spasial

## Struktur Folder

```text
geo_sentiment_mie_ayam_purwokerto/
|-- dataset/
|   |-- raw/
|   |   `-- all_platforms_raw.csv
|   `-- processed/
|       |-- all_platforms_preprocessed.csv
|       `-- gmaps_preprocessed.csv
|-- geo_sentiment_fix/
|   `-- indobert_opt_recall_neg/
|       |-- config.json
|       |-- model.safetensors
|       |-- threshold_config.json
|       |-- tokenizer.json
|       `-- tokenizer_config.json
|-- output/
|   `-- geo_sentiment_fix/
|       |-- mie_ayam_spatial_sentiment_map.html
|       |-- mie_ayam_spatial_sentiment_map_enhanced.html
|       |-- model_evaluation_extended_metrics.csv
|       |-- indobert_optimized_results.csv
|       |-- spatial_review_predictions.csv
|       `-- visualisasi serta file audit lainnya
|-- geo_sentiment_fix.ipynb
|-- requirements_geo_sentiment_fix.txt
`-- README.md
```

## Prasyarat

Sebelum menjalankan project, pastikan sudah tersedia:

- Python 3.10 atau lebih baru
- pip
- Git, opsional jika project di-clone dari repository
- Jupyter Notebook atau JupyterLab
- Koneksi internet saat pertama kali menginstal package atau mengunduh model dari Hugging Face

Jika menggunakan GPU NVIDIA, pastikan driver dan versi PyTorch CUDA sudah sesuai dengan environment lokal.

## Cara Setup Project

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
python -m pip install --upgrade pip
```

Install semua dependency:

```bash
pip install -r requirements_geo_sentiment_fix.txt
```

Tambahkan environment ke Jupyter kernel:

```bash
python -m ipykernel install --user --name geo-sentiment-mie-ayam --display-name "Python (Geo Sentiment Mie Ayam)"
```

## Dependency yang Perlu Diinstal

Daftar dependency utama sudah tersedia di `requirements_geo_sentiment_fix.txt`.

Kategori dependency:

- Core data science: `numpy`, `pandas`, `scikit-learn`, `matplotlib`, `seaborn`, `tqdm`, `openpyxl`
- NLP Bahasa Indonesia: `nltk`, `Sastrawi`, `wordcloud`
- Deep learning dan model transformer: `torch`, `transformers`, `accelerate`, `safetensors`, `sentencepiece`, `sacremoses`, `protobuf`
- Spatial analysis: `folium`, `geopandas`, `shapely`, `pyproj`, `pyogrio`
- Notebook environment: `jupyter`, `ipykernel`, `ipywidgets`

Catatan: instalasi `geopandas` di beberapa environment Windows dapat membutuhkan dependency geospasial tambahan. Jika instalasi melalui pip bermasalah, gunakan environment Conda atau pastikan package geospasial seperti `shapely`, `pyproj`, dan `pyogrio` berhasil terpasang.

## Cara Menjalankan Project

Jalankan Jupyter:

```bash
jupyter notebook
```

Lalu buka file:

```text
geo_sentiment_fix.ipynb
```

Pilih kernel:

```text
Python (Geo Sentiment Mie Ayam)
```

Jalankan notebook dari atas ke bawah. Notebook akan membaca data dari folder `dataset/`, melakukan preprocessing dan evaluasi, lalu menghasilkan file output ke folder `output/geo_sentiment_fix/`.

## Dataset

Dataset utama:

- `dataset/raw/all_platforms_raw.csv`: data ulasan mentah.
- `dataset/processed/all_platforms_preprocessed.csv`: data gabungan yang sudah diproses.
- `dataset/processed/gmaps_preprocessed.csv`: data Google Maps yang sudah diproses.

Pastikan file dataset tetap berada pada struktur folder yang sama agar path di notebook tidak perlu diubah.

## Model

Model tersimpan di:

```text
geo_sentiment_fix/indobert_opt_recall_neg/
```

Isi folder model meliputi konfigurasi, tokenizer, bobot model `model.safetensors`, dan konfigurasi threshold. Model ini merupakan hasil optimasi IndoBERT dengan fokus pada peningkatan recall kelas negatif.

## Hasil Evaluasi

Ringkasan hasil model dari eksperimen:

| Metrik | Nilai Test |
| --- | ---: |
| Accuracy | 0.9086 |
| Recall Negatif | 0.9767 |
| Recall Positif | 0.8997 |
| Macro F1 | 0.8288 |
| Weighted F1 | 0.9187 |
| ROC-AUC | 0.9833 |
| Threshold | 0.68 |

Model yang digunakan:

```text
OPT IndoBERT + weighted/focal loss + early stopping + threshold tuning
```

Fokus utama tuning adalah menjaga kemampuan model dalam mendeteksi review negatif agar keluhan pelanggan tidak mudah terlewat.

## Output Penting

Beberapa output utama yang dihasilkan:

- `mie_ayam_spatial_sentiment_map.html`: peta sentimen interaktif.
- `mie_ayam_spatial_sentiment_map_enhanced.html`: peta sentimen interaktif versi enhanced.
- `spatial_review_predictions.csv`: prediksi sentimen per review dengan informasi lokasi.
- `spatial_location_summary.csv`: ringkasan sentimen per lokasi.
- `spatial_location_summary_enhanced.csv`: ringkasan sentimen per lokasi versi enhanced.
- `spatial_kecamatan_summary.csv`: ringkasan sentimen per kecamatan.
- `top_positive_locations.csv`: lokasi dengan sentimen positif tertinggi.
- `top_negative_locations.csv`: lokasi dengan sentimen negatif tertinggi.
- `top_complaint_volume_locations.csv`: lokasi dengan volume keluhan tertinggi.
- `confusion_matrix_indobert_opt.png`: confusion matrix model.
- `roc_pr_indobert_opt.png`: kurva ROC dan precision-recall.
- `model_evaluation_extended_dashboard.png`: dashboard evaluasi model.
- `eda_wordcloud_by_class.png`: wordcloud berdasarkan kelas sentimen.
- `eda_top_words_by_class.png`: kata paling sering muncul per kelas.

File HTML peta dapat dibuka langsung melalui browser.

## Alur Analisis

1. Data loading dan validasi kolom.
2. Text cleaning dan normalisasi teks Bahasa Indonesia.
3. Exploratory Data Analysis, termasuk distribusi label, panjang teks, top words, dan wordcloud.
4. Data splitting untuk training, validation, dan test.
5. Training IndoBERT dengan strategi weighted/focal loss.
6. Threshold tuning untuk meningkatkan recall kelas negatif.
7. Evaluasi menggunakan accuracy, recall, F1-score, ROC-AUC, PR-AUC, MCC, Cohen Kappa, Brier score, dan log loss.
8. Error analysis untuk false negative dan false positive.
9. Agregasi spasial per lokasi dan kecamatan.
10. Pembuatan peta sentimen interaktif.

## Troubleshooting

Jika package gagal diinstal:

```bash
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements_geo_sentiment_fix.txt
```

Jika Jupyter tidak menemukan kernel:

```bash
python -m ipykernel install --user --name geo-sentiment-mie-ayam --display-name "Python (Geo Sentiment Mie Ayam)"
```

Jika PyTorch ingin dijalankan dengan CUDA, instal PyTorch sesuai versi CUDA dari dokumentasi resmi PyTorch, lalu jalankan kembali instalasi package lainnya.

Jika file peta HTML tidak tampil sempurna, pastikan file dibuka dari browser modern seperti Chrome, Edge, atau Firefox.

## Catatan Portfolio

Project ini menampilkan kemampuan dalam:

- End-to-end data science workflow.
- NLP Bahasa Indonesia menggunakan transformer model.
- Optimasi model untuk kebutuhan bisnis, khususnya deteksi review negatif.
- Evaluasi model yang tidak hanya mengandalkan accuracy.
- Analisis spasial dan penyajian hasil dalam bentuk peta interaktif.
- Dokumentasi output yang dapat ditinjau ulang untuk audit dan interpretasi.

## Author

Project ini dibuat sebagai bagian dari portfolio data science dan machine learning.
