import os
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from utils.helpers import read_prompt_file

JOB_DESCRIPTION = read_prompt_file("job_description.txt")
EXTRACTION_PROMPT_TEMPLATE = read_prompt_file("extraction_prompt.txt")
RANKING_PROMPT_TEMPLATE = read_prompt_file("ranking_prompt.txt")

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant",
    temperature=0.0,
    max_tokens=4096,
)

extraction_prompt = PromptTemplate(
    input_variables=["human_input"],
    template=EXTRACTION_PROMPT_TEMPLATE
)

ranking_prompt = PromptTemplate(
    input_variables=["job_desc", "candidate_infos"],
    template=RANKING_PROMPT_TEMPLATE
)

