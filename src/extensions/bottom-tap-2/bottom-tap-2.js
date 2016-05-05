window.changyan.api.ready(function (api) {

    var $ = api.util.jquery,
        _ = api.util._,
        template = api.util.velocityjs;
    var isShow = api.getBeConfig('use_user_level');
    if ((isShow === undefined || isShow === null) || !(isShow.toString() === 'true')) { return;}
    require('./cy-grade.css');
    var $mod = $('#SOHUCS #SOHU_MAIN');
    var templ = require('./cy-grade.html');
    var html = template.render(templ, {});

    (function () {
        var rederMap = {};

        // 数据获取
        var getUserGrade = function (data) {
            var itemTemp = {};
            var user_id = data.passport.user_id;
            itemTemp['level'] = data.userScore.level;
            itemTemp['title'] = data.userScore.title;
            itemTemp['is_official'] = data.passport.is_official;
            return [user_id, itemTemp];
        }
        api.event.listen('changyan:cmt-list:render-item', function (data) {
            // data  当前评论数据
            var temp = getUserGrade(data);
            if (temp[0] in rederMap) {
                return;
            }
            rederMap[temp[0]] = temp[1];
        });

        // 等级渲染函数
        var levelItemRender = function ($item) {
            var itemId = $item.data('user-id');
            // 跳过无等级渲染, 管理员渲染
            if (rederMap[itemId] === undefined || rederMap[itemId].is_official) {
                return;
            }
            var itemLevel = rederMap[itemId].level;
            var itemTitle = rederMap[itemId].title;
            var $itemRender = $item.find('.wrap-user-gw').eq(0).find('span[node-type="nickname"]');
            var $itemCurrent;
            var levelClass = 'user-' + itemLevel.toString() + '-gw';

            // 避免重复渲染
            if ($itemRender.next().is('.user-level-gw')) {
                return;
            }
            $itemRender.after($(html));
            $itemCurrent = $itemRender.next();

            // 等级判断
            if (itemLevel > 0 && itemLevel <= 4) {
                 $itemCurrent.addClass('user-1-4-gw');
            } else if (itemLevel > 4 && itemLevel <= 7) {
                $itemCurrent.addClass('user-5-7-gw');
            } else if (itemLevel > 7 && itemLevel <= 10) {
                $itemCurrent.addClass('user-8-10-gw');
            }
            $itemCurrent.addClass(levelClass);
            $itemCurrent.find('i').html(itemTitle);
        }

        // list渲染后，渲染等级
        api.event.listen('changyan:cmt-list:list-render', function (e) {
            var $itemArray = $mod.find('div[node-type="cmt-item"]:not(\'div[node-type=\"floor-item\"]\')');

            for (var i = 0; i < $itemArray.length; i++) {
                levelItemRender($itemArray.eq(i));
            }
        });

        // 提交后渲染等级
        api.event.listen('changyan:submit', function (data) {
            setTimeout(function () {
                var $submitItem = $mod.find('[node-type~="cmt-list"]').children(':first');
                levelItemRender($submitItem);
            });
        });

    }());
});