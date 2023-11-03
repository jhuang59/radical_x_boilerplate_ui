from flask import Flask, request, jsonify
from Agents import agents
app = Flask(__name__)
#construct agents
m=agents()
user_proxy,groupchat,manager=m.construct()

curr_msg = 0

#set up the API endpoint
@app.route('/query', methods=['POST'])
def query_agent():
    data = request.json
    user_input = data['message']
    user_proxy.initiate_chat(
        manager,
        message=user_input,
        clear_history=True
    )
    chat_history = groupchat.messages
    # print("response", groupchat.messages)
    # response = [{'content': '132', 'role': 'user', 'name': 'SeniorDeveloper'}, 
    #             {'content': "I'm sorry, but it seems like there was a misunderstanding...", 'role': 'user', 'name': 'TaskMaster'},
    #             {'content': "Alright, let's start with the first task...", 'role': 'user', 'name': 'JuniorDeveloper'}]
    # execute_result = [{'content': 'hello world', 'role': 'user', 'name': 'TaskMaster'},]
    global curr_msg
    response = chat_history[curr_msg: ]
    curr_msg = len(chat_history)
    return response

@app.route('/compile', methods=['POST'])
def compile_agent():
    data = request.json
    user_input = data['message']
    user_proxy.initiate_chat(
        manager,
        message=user_input,
        clear_history=True
    )
    chat_history = groupchat.messages
    # print("response", groupchat.messages)
    # execute_result = [{'content': 'hello world', 'role': 'user', 'name': 'TaskMaster'},]
    global curr_msg
    response = chat_history[curr_msg: ]
    curr_msg = len(chat_history)
    return response

if __name__ == '__main__':
    app.run(port=5000)