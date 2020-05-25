export default async function (dataArray, searchQuery) {
    return dataArray.filter(el => el.country.toLowerCase().includes(searchQuery.toLowerCase()));
}