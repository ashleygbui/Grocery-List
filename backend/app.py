import logging
from quart import Quart, jsonify, request
from quart_cors import cors
from schemas import GroceryItemSchema


app = Quart(__name__)
app = cors(app, allow_origin='*') # Allow requests from the frontend origin

user_grocery_list = [
    {"id": "u1", "col1": "Strawberry Yogurt", "col2": "Dairy", "col3": "3"}
]


main_grocery_list = [
    {"id": "m1", "col1": "Strawberry Yogurt", "col2": "Dairy", "col3": "3"},
    {"id": "m2", "col1": "Bananas", "col2": "Produce", "col3": "3"},
    {"id": "m3", "col1": "Family Size Popcorn", "col2": "Snack", "col3": "3"},
]

user_schema = GroceryItemSchema()  # Schema for user grocery items
main_schema = GroceryItemSchema()  # Schema for main grocery items

@app.route("/api/userlist", methods=["GET"])
async def get_user_list():
    return jsonify(user_grocery_list)

@app.route("/api/mainlist", methods=["GET"])
async def get_main_list():
    return jsonify(main_grocery_list)

def add_item_user(new_item_data):
    new_item_user = {
        "id": "u" + str(len(main_grocery_list) + 1),
        "col1": new_item_data["col1"],
        "col2": new_item_data["col2"],
        "col3": new_item_data["col3"],
    }
    user_grocery_list.append(new_item_user)

def add_item_main(new_item_data):

    new_item_main = {
         "id": "m" + str(len(main_grocery_list) + 1),
        "col1": new_item_data["col1"],
        "col2": new_item_data["col2"],
        "col3": new_item_data["col3"],
    }
    main_grocery_list.append(new_item_main)

@app.route("/api/addItem", methods=["POST"])
async def add_item():
    new_item_data = await request.json
    errors = user_schema.validate(new_item_data)
    add_item_main(new_item_data)
    add_item_user(new_item_data)
    return jsonify(main_grocery_list)

@app.route("/api/deleteItem/<string:item_id>", methods=["DELETE"])
async def delete_item(item_id):
    global user_grocery_list

    # Find the index of the item with the specified id in the user grocery list
    index_to_delete = None
    for i, item in enumerate(user_grocery_list):
        if item["id"] == item_id:
            index_to_delete = i
            break

    # If the item is found, remove it from the user grocery list
    if index_to_delete is not None:
        del user_grocery_list[index_to_delete]
        return jsonify({"message": "Item deleted successfully"})
    else:
        return jsonify({"error": "Item not found"}), 404
    




if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5173)