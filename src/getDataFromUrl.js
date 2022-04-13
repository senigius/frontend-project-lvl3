import axios from "axios";
import parser from "./parser";
import makePostsAndFeeds from "./makePostsAndFeeds";

const getDataFromUrl = (elements, value) => {
    axios.get(value)
    .then((response) => {
        console.log(response.status);
        const parsedData = parser(response.data);
        console.log(parsedData);
        const dataElements = {
            generalTitle: parsedData.querySelector('title'),
            description: parsedData.querySelector('description'),
            items: parsedData.querySelectorAll('item'),
        };
        makePostsAndFeeds(elements, dataElements);
        })
    .catch((e) => {
        console.log(e.inner);
    });
};

export default getDataFromUrl;