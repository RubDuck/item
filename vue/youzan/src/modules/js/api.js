let url={
    hotLists:'search/list',
    banner:'index/banner',
    topList:'category/topList',
    subList:'category/subList',
    rankList:'category/rank',
    searchList:'search/list',
    detailsList:'goods/details',
    dealList:'goods/deal'
}

let host = 'http://rap2api.taobao.org/app/mock/7058/'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key]=host+url[key]
    }
}

export default url