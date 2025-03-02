from datasets import load_dataset

# Load datasets
wiki_large = load_dataset("WikiLarge", split="train")
cnn_dailymail = load_dataset("cnn_dailymail", "3.0.0", split="train")

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

model_name = "meta-llama/Meta-Llama-3.1-70B-Instruct-fast" 
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


def preprocess_function(examples):
    inputs = [ex for ex in examples["article"]]  # For CNN/DailyMail
    model_inputs = tokenizer(inputs, max_length=512, truncation=True, padding="max_length")

    # For summarization, labels should be the summaries
    labels = tokenizer(examples["highlights"], max_length=128, truncation=True, padding="max_length")
    model_inputs["labels"] = labels["input_ids"]

    return model_inputs

cnn_dailymail = cnn_dailymail.map(preprocess_function, batched=True)


def preprocess_simplification(examples):
    inputs = [ex for ex in examples["complex"]]  # Complex sentence
    targets = [ex for ex in examples["simple"]]  # Simplified sentence
    
    model_inputs = tokenizer(inputs, max_length=512, truncation=True, padding="max_length")
    labels = tokenizer(targets, max_length=128, truncation=True, padding="max_length")

    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

wiki_large = wiki_large.map(preprocess_simplification, batched=True)


from transformers import TrainingArguments, Trainer

training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    save_total_limit=2
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=cnn_dailymail,  # Change to wiki_large for simplification
    eval_dataset=cnn_dailymail,
)

trainer.train()
