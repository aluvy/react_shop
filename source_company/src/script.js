// scrollTop
export function scrollTop(){
    window.scrollTo(0,0);
}


// 금액 콤마(,) 표시
export function format_money(item){
    if( item == null ){ return "-"; }
    item = String(item);
    return item = Number(item).toLocaleString('ko-KR');
}

// 핸드폰번호 000-****-0000
export function format_phone(phone){
    if( phone == null ){ return "-"; }
    phone = String(phone);
    return phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-****-$3");

}

// 핸드폰번호 000-0000-0000
export function format_phone_all(phone){
    if( phone == null ){ return "-"; }
    phone = String(phone);
    return phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

// 특수문자 제거
export function format_remove(item){
    if( item == null ){ return "-"; }
    item = String(item);
    return item = item.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, "");
}

// 공백제거
export function format_noGap(item){
    if( item == null ){ return "-"; }
    item = String(item);
    return item = item.replace(/\s/g,'');
}

// HTML
export function format_html(item){
    if( item == null ){ return item; }
    item = String(item);
    return item = item.replace(/\n/gi,'<br>');
}