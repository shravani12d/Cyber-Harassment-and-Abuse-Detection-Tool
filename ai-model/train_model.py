import pandas as pd
import numpy as np
import pickle
import re
import nltk
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from nltk.corpus import stopwords

# Download stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Load dataset
df = pd.read_csv('train.csv')
df = df[['comment_text', 'toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']].dropna()

# Preprocess text
def clean_text(text):
    text = text.lower()
    text = text.encode("ascii",errors="ignore").decode()
    text = re.sub(r"http\S+|www\S+|https\S+", '', text)
    text = re.sub(r'\@\w+|\#', '', text)
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    words = text.split()
    words = [word for word in text.split() if word not in stop_words]
    return " ".join(words)

df['clean_text'] = df['comment_text'].apply(clean_text)

# Features and labels
X = df['clean_text']
y = df[['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']]

# Vectorization
vectorizer = TfidfVectorizer(max_features=5000)
X_vec = vectorizer.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_vec, y, test_size=0.2, random_state=42)

# Model training
model = MultiOutputClassifier(LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print("✅ Classification Report:\n")
print(classification_report(y_test, y_pred, target_names=y.columns))

# Save the model and vectorizer
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Model training complete and saved.")