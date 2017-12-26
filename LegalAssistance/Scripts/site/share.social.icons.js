(function () {
    var Share = {
        vkontakte: function (purl, ptitle, pimg, text) {
            url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&image=' + encodeURIComponent(pimg);
            url += '&noparse=true';
            Share.popup(url);
        },
        odnoklassniki: function (purl, text) {
            url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
            url += '&st.comments=' + encodeURIComponent(text);
            url += '&st._surl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        facebook: function (purl, ptitle, pimg, text) {
            url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]=' + encodeURIComponent(ptitle);
            url += '&p[summary]=' + encodeURIComponent(text);
            url += '&p[url]=' + encodeURIComponent(purl);
            url += '&p[images][0]=' + encodeURIComponent(pimg);
            Share.popup(url);
        },
        twitter: function (purl, ptitle) {
            url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(ptitle);
            url += '&url=' + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },
        mailru: function (purl, ptitle, pimg, text) {
            url = 'http://connect.mail.ru/share?';
            url += 'url=' + encodeURIComponent(purl);
            url += '&title=' + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&imageurl=' + encodeURIComponent(pimg);
            Share.popup(url)
        },
        popup: function (url) {
            window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        }
    };

    //Register events on share social
    $(document).ready(function () {
        var siteUrl = location.origin;
        var text = 'ЮРобот';
        var image = 'https://www.wmj.ru/imgs/2016/12/05/09/929194/d1bbd77c2612ef45eee03defa5c373710d7c56e8.jpg';
        var title = 'Создайте заявление - верните деньги за товары и услуги. Заполните форму - получите готовый для печати документ. Это просто и бесплатно.'
        
        $('.js-share-site-vk').click(function () {
            Share.vkontakte(siteUrl, title, image, text);
        })

        $('.js-share-site-facebook').click(function () {
            Share.facebook(siteUrl, title, image, text);
        })

        $('.js-share-site-twitter').click(function () {
            Share.twitter(siteUrl, title, image, text);
        })

        $('.js-share-site-ok').click(function () {
            Share.odnoklassniki(siteUrl, title);
        })

        $('.js-share-site-mail-ru').click(function () {
            Share.mailru(siteUrl, title, image, text);
        })
    })
})();