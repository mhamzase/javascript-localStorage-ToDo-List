
function getAndUpdate(){
        console.log("Updating TODO's List.....");

        title = document.getElementById("title").value;
        desc = document.getElementById("description").value;

        if(localStorage.getItem('itemsJson') == null)
        {
          itemArray = [];
          itemArray.push([title,desc]);
          localStorage.setItem('itemsJson', JSON.stringify(itemArray));
        }
        else {
            itemArrayStr = localStorage.getItem('itemsJson');
            itemArray = JSON.parse(itemArrayStr);
            itemArray.push([title,desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemArray));
        }

        update();

        document.getElementById("title").value= "";
        document.getElementById("description").value = "";
}


function update(){
  if(localStorage.getItem('itemsJson')==null)
  {
    itemArray = [];
    localStorage.setItem('itemsJson',JSON.stringify(itemArray));
  }
  else {
    itemArrayStr = localStorage.getItem('itemsJson');
    itemArray = JSON.parse(itemArrayStr);
  }


// Populate the table
  let tableBody = document.getElementById('tableBody');
  let str = "";

  itemArray.forEach((item, i) => {

      str += `
      <tr>
      <th scope="row">${i+1}</th>
      <td>${item[0]}</td>
      <td>${item[1]}</td>
      <td>
        <button class="btn btn-sm btn-danger col-3" onclick="removeItem(${i})">Delete</button>
        <button id="updatebtn" class="btn btn-sm btn-warning col-3" onclick="updateItem(${i})">Update</button>
      </td>
      </tr>`;

  });

  tableBody.innerHTML = str;



}







add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();


// remove an item from the list
function removeItem(itemId){
    itemArrayStr = localStorage.getItem('itemsJson');
    itemArray = JSON.parse(itemArrayStr);
    itemArray.splice(itemId,1); // removing list item by using it's id
    localStorage.setItem('itemsJson',JSON.stringify(itemArray));

    update();
}

// update an item from the list
function updateItem(itemId)
{
    
    itemArrayStr = localStorage.getItem('itemsJson');
    itemArray = JSON.parse(itemArrayStr);
    document.getElementById("title").value = itemArray[itemId][0];
    document.getElementById("description").value = itemArray[itemId][1];

    itemArray.splice(itemId,1);
    localStorage.setItem('itemsJson',JSON.stringify(itemArray));
    update();
}


// clear the storage on cleat list button
function clearStorage(){

  if(confirm("Do you want to clear list?"))
  {
    console.log("Clearing the storage!");
    localStorage.clear();
    update();
  }


}
