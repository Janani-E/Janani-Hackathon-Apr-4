//creating a div, textbox and search button
var div=document.createElement("div");
div.className="search-div";
var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("id","text");
input.setAttribute("required","true");

var br=document.createElement("br");

var button=document.createElement("button");
button.className="btn btn-primary";
button.addEventListener("click",loadbrewery);
button.innerHTML="Search";

//appending the textbox and search button to the div
div.append(input,br,button);
document.body.append(div);

//function to display the list of brewery data
var bdiv=document.createElement("div");
bdiv.className="brewery-list";
function listbrewery(brewery) {
    try {
    let url="";
    const breweryContainer = document.createElement("div");
    breweryContainer.className = "brewery-container";
    function notNull(value) {
    if (value != null) {
        return value;

    }
    else {
        return "Sorry!No Info available"; }
    }
        
    function notNullAddr(addr){
        if (addr!=null){
            return addr;
        }
        else return"";
    }   
    breweryContainer.innerHTML = ` 
        <div>

            <p class="brewery-values">Brewery Name:${notNull(brewery.name)}</p>
            <p class="brewery-values">Brewery ID:${notNull(brewery.id)}</p>
            <p class="brewery-values">Brewery Address:${notNullAddr(brewery.street)} ${notNullAddr(brewery.address_2)} ${notNullAddr(brewery.address_3)} ${notNullAddr(brewery.city)} ${notNullAddr(brewery.state)} ${notNullAddr(brewery.country)} ${notNullAddr(brewery.postal_code)}. </p>
            <p class="brewery-values">Brewery website:${notNull(brewery.website_url)}</p>
            <p class="brewery-values">Brewery PhoneNo:${notNull(brewery.phone)}</p>
         </div>
        `;
  
    bdiv.append(breweryContainer);
    
        }
    catch{
        console.log(error);
    }    
}

document.body.append(bdiv);


//function to fetch data from the brewery api using the searched value
async function loadbrewery() {
let cc=document.getElementById("text").value;
const data = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${cc}`);
const breweryData = await data.json();
breweryData.forEach((brewery) => listbrewery(brewery));
}