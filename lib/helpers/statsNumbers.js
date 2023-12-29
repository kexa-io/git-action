"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinMaxMeanMedianToPercentage = exports.convertToPercentage = exports.getMinMaxMeanMedian = void 0;
function getMinMaxMeanMedian(array) {
    let min = array[0];
    let max = array[0];
    let sum = 0;
    for (const num of array) {
        if (num < min)
            min = num;
        if (num > max)
            max = num;
        sum += num;
    }
    return {
        "min": min,
        "max": max,
        "mean": sum / array.length,
        "median": array[Math.floor(array.length / 2)],
    };
}
exports.getMinMaxMeanMedian = getMinMaxMeanMedian;
function convertToPercentage(num, total) {
    // pourcentage avec 2 chiffres après la virgule
    return Math.round((num / total) * 10000) / 100;
}
exports.convertToPercentage = convertToPercentage;
function convertMinMaxMeanMedianToPercentage(stat, total) {
    return {
        "min": convertToPercentage(stat.min, total),
        "max": convertToPercentage(stat.max, total),
        "mean": convertToPercentage(stat.mean, total),
        "median": convertToPercentage(stat.median, total),
    };
}
exports.convertMinMaxMeanMedianToPercentage = convertMinMaxMeanMedianToPercentage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHNOdW1iZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvc3RhdHNOdW1iZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLG1CQUFtQixDQUFDLEtBQW9CO0lBQ3BELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osS0FBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUM7UUFDbkIsSUFBRyxHQUFHLEdBQUcsR0FBRztZQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBRyxHQUFHLEdBQUcsR0FBRztZQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDeEIsR0FBRyxJQUFJLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTztRQUNILEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRyxHQUFDLEtBQUssQ0FBQyxNQUFNO1FBQ3hCLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlDLENBQUE7QUFDTCxDQUFDO0FBZkQsa0RBZUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxHQUFXLEVBQUUsS0FBYTtJQUMxRCwrQ0FBK0M7SUFDL0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFDLEtBQUssQ0FBQyxHQUFDLEtBQUssQ0FBQyxHQUFDLEdBQUcsQ0FBQztBQUM3QyxDQUFDO0FBSEQsa0RBR0M7QUFFRCxTQUFnQixtQ0FBbUMsQ0FBQyxJQUFxQixFQUFFLEtBQVk7SUFDbkYsT0FBTztRQUNILEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztRQUMzQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7UUFDM0MsTUFBTSxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQzdDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztLQUNwRCxDQUFBO0FBQ0wsQ0FBQztBQVBELGtGQU9DIn0=