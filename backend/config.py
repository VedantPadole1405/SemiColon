import os


class Settings:
    VERYFI_CLIENT_ID: str = os.getenv("VERYFI_CLIENT_ID", "")
    VERYFI_API_KEY: str = os.getenv("VERYFI_API_KEY", "")
    VERYFI_USERNAME: str = os.getenv("VERYFI_USERNAME", "")
    VERYFI_CATEGORIES: str = os.getenv("VERYFI_CATEGORIES", "Bank Statements")


settings = Settings()