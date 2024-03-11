import logging
from quart import Quart, jsonify, request
from quart_cors import cors

app = Quart(__name__)
app = cors(app, allow_origin='*') # Allow requests from the frontend origin

user_grocery_list = [
    {"id": 1, "col1": "Yogurt", "col2": "Dairy", "col3": "3"},
]

main_grocery_list = [
    {"id": 1, "col1": "Strawberry Yogurt", "col2": "Dairy", "col3": "3"},
    {"id": 2, "col1": "Bananas", "col2": "Produce", "col3": "3"},
    {"id": 3, "col1": "Family Size Popcorn", "col2": "Snack", "col3": "3"},
]

@app.route("/api/userlist", methods=["GET"])
async def get_user_list():
    return jsonify(user_grocery_list)

@app.route("/api/mainlist", methods=["GET"])
async def get_main_list():
    return jsonify(main_grocery_list)

@app.route("/api/addItemToUser", methods=["POST"])
async def add_item():
    # global grocery_list
    new_item_data = await request.json
    new_item = {
        "id": len(user_grocery_list) + 1,
        "col1": new_item_data["col1"],
        "col2": new_item_data["col2"],
        "col3": new_item_data["col3"],
    }
    user_grocery_list.append(new_item)
    return jsonify(user_grocery_list)



if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5173)