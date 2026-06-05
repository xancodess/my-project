# Drowsiness Detection with YOLOv11n

Sistem deteksi kantuk berbasis computer vision untuk mengenali kondisi mata terbuka dan mata tertutup pada wajah pengemudi. Proyek ini menggunakan YOLOv11n untuk object detection, MediaPipe untuk pendeteksian wajah, serta logika temporal untuk membantu mendeteksi indikasi microsleep, yawning, dan tren kantuk berbasis PERCLOS.

## Ringkasan

Program ini dibuat sebagai pipeline end-to-end mulai dari persiapan dataset, anotasi, konversi ke format YOLO, augmentasi, training, evaluasi, hingga inferensi menggunakan webcam. Dataset utama tidak disertakan langsung di repository karena ukurannya besar. Dataset, model tambahan, dan file pendukung dapat diunduh melalui Google Drive berikut:

**Google Drive:** `https://drive.google.com/drive/folders/1eQ51gLUQMjiw1zUbTVbyyk3F1u-SfsM2?usp=sharing`

## Fitur Utama

- Deteksi dua kelas kondisi mata: `eye_open` dan `eye_closed`.
- Training YOLOv11n dengan input image size 640.
- Preprocessing dan normalisasi frame dari video.
- Augmentasi data menggunakan Albumentations.
- Evaluasi model menggunakan metrik YOLO, confusion matrix, dan ROC curve.
- Inferensi realtime menggunakan webcam.
- Temporal smoothing untuk mengurangi prediksi yang tidak stabil antar-frame.
- Alert logic untuk microsleep, yawning, dan PERCLOS.

## Struktur Repository

```text
drowsy_detection/
+-- Drowsiness_Detection_Viskom_Kelompok_4_v2_copy.ipynb
+-- README.md
+-- requirements.txt
+-- dataset_v3/
|   +-- data.yaml
+-- models/
|   +-- drowsy_eye_v3/
|       +-- args.yaml
|       +-- results.csv
|       +-- results.png
|       +-- confusion_matrix.png
|       +-- confusion_matrix_normalized.png
|       +-- weights/
|           +-- best.pt
|           +-- best.onnx
+-- confusion_matrix_v3.png
+-- roc_v3.png
+-- verify_v3.png
+-- verify_training_v3.png
```

Folder besar seperti `raw_data/`, `frames/`, `dataset_v3/images/`, `dataset_v3/labels/`, `staging_v3/`, dan `annotations_v3/` sebaiknya tidak dipush ke GitHub. Simpan folder tersebut di Google Drive atau storage eksternal, lalu cantumkan link-nya di README ini.

## Dataset

Dataset menggunakan format YOLO object detection dengan dua kelas:

```yaml
names:
  - eye_open
  - eye_closed
nc: 2
train: images/train
val: images/val
test: images/test
```

Setelah mengunduh dataset dari Google Drive, letakkan data ke struktur berikut:

```text
dataset_v3/
+-- data.yaml
+-- images/
|   +-- train/
|   +-- val/
|   +-- test/
+-- labels/
    +-- train/
    +-- val/
    +-- test/
```

Jika menjalankan di perangkat berbeda, pastikan path pada `dataset_v3/data.yaml` sudah sesuai dengan lokasi dataset.

## Model

Model utama yang digunakan:

- Arsitektur: YOLOv11n
- Task: object detection
- Input size: 640
- Epochs: 100
- Optimizer: AdamW
- Classes: `eye_open`, `eye_closed`
- Output final: `models/drowsy_eye_v3/weights/best.pt`
- Export ONNX: `models/drowsy_eye_v3/weights/best.onnx`

Hasil training akhir pada epoch 100:

| Metric | Value |
| --- | ---: |
| Precision | 0.969 |
| Recall | 0.959 |
| mAP50 | 0.990 |
| mAP50-95 | 0.904 |

## Menjalankan di Anaconda Prompt

1. Buka Anaconda Prompt.

2. Masuk ke folder proyek.

```bash
cd C:\Users\ACER\drowsy_detection
```

3. Buat environment baru.

```bash
conda create -n drowsy-detection python=3.10 -y
conda activate drowsy-detection
```

4. Install dependency.

```bash
pip install -r requirements.txt
```

5. Jika menggunakan GPU NVIDIA, install PyTorch sesuai versi CUDA yang tersedia di perangkat. Contoh untuk CUDA 12.1:

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

Jika tidak menggunakan GPU, versi CPU dari PyTorch tetap dapat digunakan, tetapi training akan jauh lebih lambat.

6. Jalankan Jupyter Notebook.

```bash
jupyter notebook
```

7. Buka file berikut:

```text
Drowsiness_Detection_Viskom_Kelompok_4_v2_copy.ipynb
```

8. Jalankan cell secara berurutan dari fase setup, persiapan dataset, training, evaluasi, hingga inference.

## Menjalankan di Google Colab

1. Upload notebook ke Google Colab atau buka dari repository GitHub.

2. Aktifkan GPU:

```text
Runtime -> Change runtime type -> Hardware accelerator -> GPU
```

3. Mount Google Drive.

```python
from google.colab import drive
drive.mount('/content/drive')
```

4. Clone repository.

```bash
!git clone https://github.com/username/drowsy_detection.git
%cd drowsy_detection
```

Ganti `username` dengan username GitHub yang digunakan.

5. Install dependency.

```bash
!pip install -r requirements.txt
```

6. Salin atau ekstrak dataset dari Google Drive ke folder `dataset_v3/`.

```bash
!cp -r "/content/drive/MyDrive/path_to_dataset/dataset_v3" ./dataset_v3
```

Sesuaikan `path_to_dataset` dengan lokasi dataset di Google Drive.

7. Pastikan isi `dataset_v3/data.yaml` sesuai dengan lokasi dataset di Colab. Contoh:

```yaml
path: /content/drowsy_detection/dataset_v3
train: images/train
val: images/val
test: images/test
names:
  - eye_open
  - eye_closed
nc: 2
```

8. Jalankan notebook dari awal atau langsung mulai dari fase training/evaluasi jika dataset dan model sudah tersedia.

## Inferensi Realtime

Notebook menyediakan bagian inference menggunakan webcam dengan komponen berikut:

- YOLO model untuk klasifikasi kondisi mata.
- MediaPipe Face Detection untuk mengambil area wajah.
- Temporal smoothing dengan window 15 frame.
- Confidence threshold default untuk inference realtime: `0.40`.

Pada Colab, webcam realtime OpenCV tidak selalu berjalan seperti di lokal. Untuk pengujian di Colab, gunakan gambar atau video input. Untuk realtime webcam, jalankan notebook di laptop/PC melalui Anaconda Prompt.

## Catatan Push ke GitHub

File yang aman dipush:

- Notebook utama.
- `README.md`.
- `requirements.txt`.
- `dataset_v3/data.yaml`.
- Grafik hasil evaluasi.
- File konfigurasi dan hasil training.
- Model final ukuran kecil seperti `best.pt` dan `best.onnx`.

File yang sebaiknya tidak dipush:

- Dataset gambar penuh.
- File video mentah.
- Frame hasil ekstraksi.
- Checkpoint epoch seperti `epoch0.pt`, `epoch10.pt`, dan seterusnya.
- Cache training.
- Folder staging atau hasil preprocessing besar.

Gunakan Google Drive untuk dataset dan artefak besar, lalu masukkan link akses pada bagian Dataset.

## Author

Proyek ini dikembangkan untuk eksperimen deteksi kantuk pengemudi berbasis YOLO dan computer vision.
