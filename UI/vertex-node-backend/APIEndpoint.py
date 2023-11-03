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
    #manager.run_chat(messages=[{'content': user_input, 'role': 'user', 'name': 'SeniorDeveloper'}],sender=user_proxy,config=groupchat)
    # response=groupchat.messages
    # print("response", groupchat.messages)
    # print(jsonify({"response": response}))
    return jsonify(groupchat.messages)

if __name__ == '__main__':
    app.run(port=5000)