def generate_learning_content(topic: str, user_type: str):

    if user_type == "student":
        return f"""
        Here is a simple explanation of {topic}:

        {topic} means managing your money wisely.
        Start by saving small amounts regularly.
        Avoid unnecessary expenses.
        Invest in safe options like index funds.
        """

    return f"Explanation about {topic}"