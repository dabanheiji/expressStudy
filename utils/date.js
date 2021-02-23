function formatDate(date, format = "YYYY-MM-DD hh:mm:ss"){
	const reg_Y = /YYYY/g;
	const reg_M = /MM/g;
	const reg_D = /DD/g;
	const reg_h = /hh/g;
	const reg_m = /mm/g;
	const reg_s = /ss/g;

	const newDate = new Date(date);
    const Y = newDate.getFullYear();
    const M = (newDate.getMonth() + 1 > 9) ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1);
    const D = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
    const h = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours();
    const m = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes();
    const s = newDate.getSeconds() > 9 ? newDate.getSeconds() : '0' + newDate.getSeconds();

    return format.replace(reg_Y, Y).replace(reg_M, M).replace(reg_D, D).replace(reg_h, h).replace(reg_m, m).replace(reg_s, s);
}

function createTime(){
    const now = new Date();
    return formatDate(now);
}

module.exports = {
    createTime,
	formatDate
};