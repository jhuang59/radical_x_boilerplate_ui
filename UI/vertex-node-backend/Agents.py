import autogen
#set up the agents
class agents():
    def __init__(self) -> None:
        pass
    def construct(self):
        config_list = [
            {
                'model': 'gpt-4',
                'api_key': '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',
            }  # OpenAI API endpoint for gpt-4
        ]
        gpt4_config = {
            "seed": 42,  # change the seed for different trials
            "temperature": 0,
            "config_list": config_list,
            "request_timeout": 120,
        }
        tm = autogen.AssistantAgent(
            name="TaskMaster",
            system_message='''TaskMaster. Provide a pair programming challenge for the Junior Developer and Senior Developer.
            This challenge should be done using python. Clearly explain the objective, the steps to be taken, and the expected results.
            TaskMaster should also provide clarity, discuss the task, and address any questions or challenges the developers may have. Make
            sure to provide a list of tasks the developers should follow in their pursuit of completing the challenge. Once the developers
            complete a task, execute the code they wrote and provide the results. Only let the developers
            move on to the next task if they completed the previous one. Completion of a task means the code written for that task successfully runs
            and met the requirements of the task. Once the entire challenge is completed, congratulate the developers.
        ''',
            llm_config=gpt4_config,
        )

        user_proxy = autogen.UserProxyAgent(
        name="SeniorDeveloper",
        system_message='''A human Senior Developer. Help the Junior Developer complete the challenge provided by the TaskMaster.
        Provide feedback to the Junior Developer and point out their mistakes. You should engage
        in effective communication with the Junior Developer, discussing coding decisions, debugging efforts,
        and problem-solving strategies as if simulating a real pair programming experience. Make sure to only provide code in python.''',
        code_execution_config={"last_n_messages": 2, "work_dir": "groupchat"},
        #human_input_mode="TERMINATE",
        )
        jd = autogen.AssistantAgent(
            name="JuniorDeveloper",
            llm_config=gpt4_config,
            system_message='''Junior Developer. You are a new developer still in the process of learning the craft.
            You can code but you still make some mistakes. You will complete the challenge provided by TaskMaster. Senior Developer
            will help you with the challenge, so make sure to collaborate with them and discuss coding decisions, debugging efforts,
            and problem-solving strategies. Ask the TaskMaster if you have any questions or concerns. For the challenge, you are to write
            code using python. Once you complete a task provided by the TaskMaster, confirm your code with the Senior Developer. Once the Senior
            Developer gives their approval, submit the code to the TaskMaster for evaluation.
        ''',
        )
        groupchat = autogen.GroupChat(agents=[user_proxy, tm, jd], messages=[], max_round=50)
        manager = autogen.GroupChatManager(groupchat=groupchat, llm_config=gpt4_config)
        return user_proxy,groupchat,manager

# user_proxy.initiate_chat(
#     manager,
#     message="Ask the TaskMaster for a coding challenge."
# )