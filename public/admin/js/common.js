function serializeToJson(form) {
    // result = {email: '', password: ''}
    var result = {};
    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (e.tagName.toLowerCase() == "button" || e.type == "submit") {
            continue;
        }
        result[e.name] = e.value;
    }
    return result;
}

// function serializeToJson(form) {
//     var result = {};
//     var f = form.serilizeArray();
//     f.forEach(function (item) {
//         result[item.name] = item.value;
//     });
//     return result;
// }