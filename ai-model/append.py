import pandas as pd
df = pd.read_csv("train.csv")
# New sarcastic examples to improve sarcasm detection
new_rows = [
    {"comment_text": "Hey sexy 😋 you are hot, wanna hook up?", "toxic": 1, "severe_toxic": 0, "obscene": 1, "threat": 0, "insult": 1, "identity_hate": 0},
    {"comment_text": "You will. I saw your pic, and damn. 🔥", "toxic": 1, "severe_toxic": 0, "obscene": 0, "threat": 0, "insult": 1, "identity_hate": 0},
    {"comment_text": "Chill! I'm being nice. You act like some celebrity 🙄", "toxic": 1, "severe_toxic": 0, "obscene": 0, "threat": 0, "insult": 1, "identity_hate": 0},
    {"comment_text": "You're just a cheap wannabe. Thinking you're hot. Lmao", "toxic": 1, "severe_toxic": 0, "obscene": 0, "threat": 0, "insult": 1, "identity_hate": 0},
    {"comment_text": "Report me? Lol. You're the joke here, bitch.", "toxic": 1, "severe_toxic": 1, "obscene": 1, "threat": 0, "insult": 1, "identity_hate": 0},
    {"comment_text": "Nobody will care about someone like you anyway. Just die.", "toxic": 1, "severe_toxic": 1, "obscene": 0, "threat": 1, "insult": 1, "identity_hate": 0},
    {"comment_text": "Go and die you piece of shit!!", "toxic": 1, "severe_toxic": 1, "obscene": 1, "threat": 1, "insult": 1, "identity_hate":0},
]



# Convert to DataFrame
new_df = pd.DataFrame(new_rows)
 

# Append the new data
df_updated = pd.concat([df, new_df], ignore_index=True)

# Save the combined data back
df_updated.to_csv("train.csv", index=False)

print("✅ New sarcastic examples successfully added to train.csv.")