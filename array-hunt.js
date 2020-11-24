$(document).ready(function () {
    var australianAnimals = ["bandicoot", "crocodile", "dingo", "echidna",
        "frilled-dragon", "kangaroo", "koala", "ostrich", "platypus",
        "striped-possum", "tasmanian-devil", "wombat"];
    var chineseFood = ["bao", "chow-mein", "dumplings", "egg-rolls",
        "fortune-cookies", "fried-rice", "gyoza", "lo-mein", "mapo-tofu",
        "ramen", "shumai", "wonton-soup"];
    var dinosaurs = ["ankylosaurus", "brachiosaurus", "dilophosaurus",
        "pachycelphalosaurus", "pterodactyl", "stegosaurus",
        "styracosaurus", "triceratops", "tyrannosaurus-rex",
        "velociraptor"];
    var solarSystem = ["earth", "jupiter", "luna", "mars", "mercury",
        "neptune", "saturn", "sol", "uranus", "venus"];

    $("#imageSet").change(showAllImages);
    $("#huntButton").click(arrayHunt);

    showAllImages();

    function showAllImages() {
        // What image set was selected? This is the directory name
        var directoryName = $("#imageSet").val();
        // Based on the selection, use the correct array
        var arrayOfImagesNames = getSelectedArray();

        // Empty out any children from the div
        var imageDiv = $("#originalArray").empty();

        // Make two rows of images, half in each row
        var half = arrayOfImagesNames.length / 2;
        // How many images are in the current row?
        var count = 0;
        // The current <div class="row">
        var row;

        for (var fileName of arrayOfImagesNames) {
            // Time to make a new row?
            if (count === 0 || count >= half) {
                row = $("<div>").addClass("row");
                imageDiv.append(row);
                count = 0;
            }
            // append a <figure> with the image and its caption
            row.append(createImage(directoryName, fileName));
            count++;
        }

    }

    function createImage(directory, fileName) {
        // Create a div with a Bootstrap class
        var col = $("<div>").addClass("col");
        // Create a figure (can have a caption)
        var figure = $("<figure>").addClass("figure");
        col.append(figure);

        // Create the image itself
        var img = $("<img>");
        img.attr("src", `${directory}/${fileName}.png`);
        img.attr("alt", fileName);

        // Add the image to the figure
        figure.append(img);

        // Create a caption
        var caption = $(`<figcaption>${fileName}</figcaption>`)
            .addClass("figure-caption text-center");
        figure.append(caption);

        return col;
    }

    function getSelectedArray() {
        // Which image set was selected?
        var selection = $("#imageSet").val();

        // Return the array that corresponds to
        // the selected string
        if (selection === "chinese")
            return chineseFood;
        else if (selection === "solar")
            return solarSystem;
        else if (selection === "dinos")
            return dinosaurs;
        else if (selection === "aussie")
            return australianAnimals;
    }

    function arrayHunt() {
        var myArray = getSelectedArray();

        /*
        Find the first and last string in the array.
        Output them to td#firstLast
         */
        var firstString = myArray[0];
        var lastString = myArray[(myArray.length)-1];
        $("td#firstLast").text(firstString +", "+lastString);

        /*
        Find the first string that contains an 'n'.
        Output it to td#firstEnn
         */
        var x;
        for (x of myArray)
        {
            if (x.includes("n")){
                var hasEnn = x;
                $("td#firstEnn").text(hasEnn);
                break;
            }
        }


        /*
        Find all of the strings with less than 6 characters.
        Output them to td#lessThanSix
         */
        var y;
        var newArray = []
        for (y of myArray)
        {
            if (y.length < 6){
                newArray.push(y);
            }
        }
        $("td#lessThanSix").text(newArray);


        /*
        Find the longest string in the array.
        Output it to td#longName
         */
        var z;
        var longest = "";
        for (z of myArray)
        {
            if (z.length>longest.length){
                longest = z;
            }
        }
        $("td#longName").text(longest); //check this for planets?


        /*
        Find all of the strings that do not contain the letter 's'.
        Output them to td#noEss
         */
        var noEssArray = [];
        for (var i = 0; i<myArray.length; i++){
            if (myArray[i].includes("s") === false){
                noEssArray.push(myArray[i]);
            }
        }
        $("td#noEss").text(noEssArray);


        /*
        Output all of the strings, but with all of their vowels
        in uppercase, to td#upperVowels
         */
        var upperVowelsArray = [];
        for (i of myArray){
            var words = i.split("");
            for (var x = 0; x<words.length; x++){
                if (words[x] === "a" || words[x] === "e" || words[x] === "i" || words[x] === "o" || words[x] === "u") {
                    words[x] = words[x].toUpperCase();
                }
            }
            upperVowelsArray.push(words.join(""));
        }
        $("td#upperVowels").text(upperVowelsArray);


        /*
        Output all of the strings in reverse order and separated by
        ' - ' to td#reverseDash
         */
        var rdArray = [];
        rdArray = myArray.reverse();
        var rdStrings = rdArray.join();
        var newStrings ="";
        for (var x = 0; x<rdStrings.length; x++){
            if (rdStrings[x] === ","){
                newStrings += "-";
            }
            else
            {
                newStrings += rdStrings[x];
            }
        }
        $("td#reverseDash").text(newStrings);
    }

});