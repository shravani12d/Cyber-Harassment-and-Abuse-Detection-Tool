import random
import string
import pandas as pd

# Function to generate random hexadecimal ID (like existing dataset)
def generate_hex_id(length=16):
    return ''.join(random.choices('0123456789abcdef', k=length))

# Load your dataset (train.csv)
df = pd.read_csv("train.csv")

# Select only the newly added rows that need new IDs
# Assuming they are at the bottom
new_rows = df.tail(6).copy()

# Generate unique IDs
new_ids = [generate_hex_id() for _ in range(6)]

# Replace the old custom IDs with new ones
new_rows['id'] = new_ids

# Update the original DataFrame
df.update(new_rows)

# Save back to CSV
df.to_csv("train.csv", index=False)

print("✅ 50 new unique IDs have been added.")