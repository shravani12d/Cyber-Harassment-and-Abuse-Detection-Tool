import pandas as pd
from sklearn.utils import resample

# Load original dataset
df = pd.read_csv("train.csv")  # replace with your actual filename

# Create abuse label (1 if any abusive flag is set)
df['abuse'] = df[['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']].sum(axis=1)
df['abuse'] = df['abuse'].apply(lambda x: 1 if x > 0 else 0)

# Split majority and minority
df_majority = df[df.abuse == 0]
df_minority = df[df.abuse == 1]

# Upsample minority
df_minority_upsampled = resample(
    df_minority,
    replace=True,  # sample with replacement
    n_samples=len(df_majority),  # match majority count
    random_state=42
)

# Combine and shuffle
df_upsampled = pd.concat([df_majority, df_minority_upsampled]).sample(frac=1, random_state=42)

# Save balanced dataset
df_upsampled.to_csv("balanced_upsampled_dataset.csv", index=False)

print("✅ Upsampling complete. Saved as 'balanced_upsampled_dataset.csv'.")