import re


def clean_description(description: str) -> str:
    if not description:
        return ""

    text = description.lower().strip()

    # remove weird characters
    text = re.sub(r"[^a-z0-9\s./&-]", "", text)

    # normalize spaces
    text = re.sub(r"\s+", " ", text)

    return text