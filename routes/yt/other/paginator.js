const sortVideos = (a, b) => {
    const correctOrder = ['minutes', 'hours', 'day', 'days', 'weeks', 'month', 'months', 'year', 'years']
    // console.log('a: ' + a.publishedText + '\nb: ' + b.publishedText)

    if (a.publishedText && b.publishedText) {
        const aSplit = a.publishedText.includes('Streamed') ? a.publishedText.replace('Streamed ', '').split(' ') : a.publishedText.split(' ')
        const bSplit = b.publishedText.includes('Streamed') ? b.publishedText.replace('Streamed ', '').split(' ') : b.publishedText.split(' ')
        if (correctOrder.indexOf(aSplit[1]) > correctOrder.indexOf(bSplit[1])) { return 1 }
        if (correctOrder.indexOf(aSplit[1]) < correctOrder.indexOf(bSplit[1])) { return -1 }
        // console.log('kondisi 1: ' + (correctOrder.indexOf(aSplit[1]) - correctOrder.indexOf(bSplit[1])))
        let sorted = (correctOrder.indexOf(aSplit[1]) - correctOrder.indexOf(bSplit[1]))
        sorted = aSplit[0] - bSplit[0]
        return sorted
    }
}

const paginator = (items, page, per_page) => {
    items.sort(sortVideos)
    var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page)
    return {
        data: paginatedItems,
        current_page: parseInt(page),
        prev_page: page - 1 ? page - 1 : undefined,
        next_page: (total_pages > page) ? parseInt(page) + 1 : undefined,
        total: items.length,
        total_pages: total_pages,
    }
}

module.exports = paginator