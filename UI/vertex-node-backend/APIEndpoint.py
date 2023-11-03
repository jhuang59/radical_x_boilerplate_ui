from flask import Flask, request, jsonify
from Agents import agents
app = Flask(__name__)
#construct agents
m=agents()
user_proxy,groupchat,manager=m.construct()

#set up the API endpoint
@app.route('/query', methods=['POST'])
def query_agent():
    data = request.json
    user_input = data['message']
    user_proxy.initiate_chat(
        manager,
        message=user_input
    )
    response = groupchat.messages
    # print("response", groupchat.messages)
    # print(jsonify({"response": response}))
    # message = [{'content': '132', 'role': 'user', 'name': 'SeniorDeveloper'}, 
    #            {'content': "I'm sorry, but it seems like there was a misunderstanding...", 'role': 'user', 'name': 'TaskMaster'},
    #            {'content': "Alright, let's start with the first task...", 'role': 'user', 'name': 'JuniorDeveloper'}]
    return response

if __name__ == '__main__':
    app.run(port=5000)