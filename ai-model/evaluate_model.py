import pandas as pd
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from torch.utils.data import DataLoader, TensorDataset


MODEL_PATH = r"C:\Users\ASUS\OneDrive\Desktop\CyberHarassmentAbuseDetectionTool\ai-model\saved_model"
BATCH_SIZE = 8 

LABELS = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']


tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()  # evaluation mode


df = pd.read_csv("train.csv")  # path to full dataset
df = df.sample(n=40000, random_state=42)
texts = df['comment_text'].tolist()
labels = df[LABELS].values  # shape: [num_samples, num_labels]

print("Number of positive samples per label:")
print(df[LABELS].sum())


all_predictions = []

for start_idx in range(0, len(texts), BATCH_SIZE):
    print(f"Processing {start_idx} / {len(texts)}")
    
    batch_texts = texts[start_idx:start_idx + BATCH_SIZE]

    inputs = tokenizer(
        batch_texts,
        padding=True,
        truncation=True,
        return_tensors="pt",
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        preds = torch.sigmoid(logits)
        preds = (preds > 0.5).int()
        all_predictions.append(preds)


predictions = torch.cat(all_predictions, dim=0)
labels_tensor = torch.tensor(labels)


exact_match = (predictions == labels_tensor).all(dim=1).sum().item() / len(labels)
print(f"Exact match accuracy: {exact_match*100:.2f}%\n")


for i, label in enumerate(LABELS):
    y_true = labels_tensor[:, i].numpy()
    y_pred = predictions[:, i].numpy()
    
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    
    print(f"Label: {label}")
    print(f"Accuracy: {acc*100:.2f}%")
    print(f"Precision: {prec*100:.2f}%")
    print(f"Recall: {rec*100:.2f}%")
    print(f"F1-score: {f1*100:.2f}%\n")
