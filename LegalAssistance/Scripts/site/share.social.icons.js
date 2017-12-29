(function () {
    var Share = {
        vkontakte: function (purl, ptitle, pimg) {
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
        facebook: function (purl) {
            url = 'http://www.facebook.com/sharer.php';            
            url += '?u=' + encodeURIComponent(purl);            
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
        var siteUrl = window.config.url;
        var title = 'ЮРобот';
        var image = window.config.url + 'images/image-for-social-network.png';
        var description = 'Создайте заявление - верните деньги за товары и услуги. Получите бесплатно юридическую консультацию и готовый для печати документ.'
        
        //VK
        $('.js-share-site-vk').click(function () {
            Share.vkontakte(siteUrl, description, image);
        })

        //Facebook        
        $('.js-share-site-facebook').click(function () {
            Share.facebook(siteUrl);
        })

        $('.js-share-site-twitter').click(function () {
            Share.twitter(siteUrl, title, image, description);
        })

        $('.js-share-site-ok').click(function () {
            Share.odnoklassniki(siteUrl, description);
        })

        $('.js-share-site-mail-ru').click(function () {
            Share.mailru(siteUrl, title, image, description);
        })
    })
})();