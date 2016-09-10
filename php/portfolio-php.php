<?
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);

$arImageSizes = array(
    "479" => "479",
    "767" => "767",
    "1023" => "1023",
    "1210" => "1210",
    "" => "1400",
    "1400" => "1600",
    "1600" => "1800",
    "1800" => "2200",
    "2200" => "2560",
);
$arMedia = array(
    "BASE" => "",

    "DESKTOP" => "max-width: 1210px",
    "TABLET" => "max-width: 1023px",
    "PHONE_LANDSCAPE" => "max-width: 767px",
    "PHONE" => "max-width: 479px",

    "LARGE_SCREEN" => "min-width: 1400px",
    "HUGE_SCREEN" => "min-width: 1600px",
    "MEGA_SCREEN" => "min-width: 1800px",
    "IMAC_SCREEN" => "min-width: 2200px",
);
$currentDir = $APPLICATION->GetCurDir();
$ID = $component->GetEditAreaId();
$archive = false;
?>
<?
if (!empty($arResult['ITEMS'])){
    foreach($arMedia as $k=>$v){
        $arParams["PREVIEW_SIZE_".$k] = !empty($arResult["UF_".$k])?$arResult["UF_".$k]:$arParams["PREVIEW_SIZE_".$k];
        $arParams["PREVIEW_SIZE_".$k] = !empty($arParams["PREVIEW_SIZE_".$k])?$arParams["PREVIEW_SIZE_".$k]:"8";
    }
	?>
    <div
        class="tiles"
        id="tiles-<?=$ID?>"
    >
        <?ob_start();?>
        <style>
            <?$arTilesHeight = array();?>
            <?foreach($arResult["ITEMS"] as $arItem){?>
                <?
                if(
                    (
                        $arItem["TYPE"] == "PORTFOLIO" &&
                        $arItem["PROPERTIES"]["ARCHIVE"]["VALUE"] != "Y"
                    ) || (
                        $arItem["TYPE"] == "BANNER"
                    )
                ){
                ?>
                    <?
                    $arSettings = (array)json_decode($arItem["PROPERTIES"]["TILE_SETTING"]["~VALUE"]["TEXT"],true);
                    $arSettings["BASE"] = !empty($arSettings["BASE"])?$arSettings["BASE"]:array();

                    $arImages = array();
                    if(!empty($arItem["PROPERTIES"]["PREVIEW_IMAGES"]["VALUE"])){
                        foreach($arItem["PROPERTIES"]["PREVIEW_IMAGES"]["VALUE"] as $arImage){
                            $arImage = CFile::GetByID($arImage)->Fetch();
                            $arImages[] = array(
                                "ID" => $arImage["ID"],
                                "SRC" => "/upload/".$arImage["SUBDIR"]."/".$arImage["FILE_NAME"],
                                "WIDTH" => $arImage["WIDTH"],
                                "HEIGHT" => $arImage["HEIGHT"],
                                "RATION" => $arImage["WIDTH"]/$arImage["HEIGHT"],
                                "AREA" => $arImage["WIDTH"]*$arImage["HEIGHT"]
                            );
                        }
                        uasort($arImages, 'sortPortfolioByArea');
                    }

                    foreach($arMedia as $k=>$v){
                        $arSettings["BASE"][$k] = !empty($arSettings["BASE"][$k])?$arSettings["BASE"][$k]:array();
                        $arSettings["BASE"][$k]["SIZE"] = !empty($arSettings["BASE"][$k]["SIZE"])?$arSettings["BASE"][$k]["SIZE"]:array(1,1);
                        $arSettings["BASE"][$k]["POSITION"] = !empty($arSettings["BASE"][$k]["POSITION"])?$arSettings["BASE"][$k]["POSITION"]:array(0,0);
                        $arSettings["BASE"][$k]["LIGHT"] = !empty($arSettings["BASE"][$k]["LIGHT"])?$arSettings["BASE"][$k]["LIGHT"]:"N";
                    }

                    $arSettings[$currentDir] = !empty($arSettings[$currentDir])?$arSettings[$currentDir]:$arSettings["BASE"];

                    foreach($arMedia as $k=>$v){
                        $arSetting = $arSettings[$currentDir][$k];
                        $arGrid = $arParams["PREVIEW_SIZE_".$k];
                        if(!isset($arTilesHeight[$k])){
                            $arTilesHeight[$k] = 0;
                        }
                        $arTilesHeight[$k] = max($arTilesHeight[$k],($arSetting["POSITION"][0]+$arSetting["SIZE"][0])/$arGrid*100);

                        if(!empty($arImages)){
                            $_arImages = array();
                            foreach($arImages as &$arImage){
                                $fit = (string)(abs($arImage["RATION"]-$arSetting["SIZE"][0]/$arSetting["SIZE"][1]));
                                if(!isset($_arImages[$fit])){
                                    $_arImages[$fit] = array();
                                }
                                $_arImages[$fit][] = $arImage;
                            }
                            ksort($_arImages);
                            $arImage = array_shift(array_shift($_arImages));
                            if(!empty($v)){
                                $_v = explode(":",$v);
                                $_v = trim($_v[1]);
                                $_v = rtrim($_v,"px");
                                $_v = $arImageSizes[$_v];
                            }else{
                                $_v = $arImageSizes[""];
                            }
                            $_v = $_v/$arGrid*max($arSetting["SIZE"]);
                            $_v = round($_v);
                            $arPrevImage = CFile::ResizeImageGet($arImage["ID"], Array("width" => 100, "height" => 100));
                            $arPrevImage["src"] = !empty($arPrevImage["src"])?$arPrevImage["src"]:$arImage["SRC"];
                            $arDetaImage = CFile::ResizeImageGet($arImage["ID"], Array("width" => $_v, "height" => $_v));
                            $arDetaImage["src"] = !empty($arDetaImage["src"])?$arDetaImage["src"]:$arImage["SRC"];
                            $arRetiImage = CFile::ResizeImageGet($arImage["ID"], Array("width" => $_v*2, "height" => $_v*2));
                            $arRetiImage["src"] = !empty($arRetiImage["src"])?$arRetiImage["src"]:$arImage["SRC"];
                            $withVisibleText = false;
                        }else{
                            $withVisibleText = true;
                            if($arItem["TYPE"] == "PORTFOLIO"){
                                $arPrevImage = array(
                                    "src" => CompressImages("/local/templates/webprofy/images/portfoilo_nophoto.jpg")
                                );
                                $arDetaImage = $arPrevImage;
                                $arRetiImage = $arPrevImage;
                                $arSetting["LIGHT"] = "N";
                            }else{
                                $arPrevImage = false;
                                $arDetaImage = false;
                                $arRetiImage = false;
                            }
                        }
                        ?>
                        <?if(!empty($v)){?>@media screen and (<?=$v?>){<?}?>
                            #tiles-<?=$ID?> #<?=$ID?>tile-<?=$arItem["ID"]?>{
                                padding:<?=$arSetting["SIZE"][0]/$arGrid*50?>% <?=$arSetting["SIZE"][1]/$arGrid*50?>%;
                                margin:<?=$arSetting["POSITION"][0]/$arGrid*100?>% 0 0 <?=$arSetting["POSITION"][1]/$arGrid*100?>%;
                            }
                            <?if(!empty($arPrevImage)){?>
                                #tiles-<?=$ID?> #<?=$ID?>tile-<?=$arItem["ID"]?> .tiles_bg{
                                    background-image: url('<?=CompressImages($arPrevImage["src"])?>');
                                }
                            <?}?>
                            <?if(!empty($arDetaImage)){?>
                                #tiles-<?=$ID?>.is-inited #<?=$ID?>tile-<?=$arItem["ID"]?> .tiles_bg{
                                    background-image: url('<?=CompressImages($arDetaImage["src"])?>');
                                }
                            <?}?>
                            <?if(!empty($arRetiImage)){?>
                                @media
                                only screen and (-webkit-min-device-pixel-ratio: 2),
                                only screen and (   min--moz-device-pixel-ratio: 2),
                                only screen and (     -o-min-device-pixel-ratio: 2/1),
                                only screen and (        min-device-pixel-ratio: 2),
                                only screen and (                min-resolution: 192dpi),
                                only screen and (                min-resolution: 2dppx) {
                                    #tiles-<?=$ID?>.is-inited #<?=$ID?>tile-<?=$arItem["ID"]?> .tiles_bg {
                                        background-image: url('<?=CompressImages($arRetiImage["src"])?>');
                                    }
                                }
                            <?}?>
                            <?if($arSetting["LIGHT"] == "Y"){?>
                                #tiles-<?=$ID?> #<?=$ID?>tile-<?=$arItem["ID"]?> .tiles_light:after {
                                    content: "";
                                }
                            <?}?>
                            <?if($withVisibleText){?>
                                #tiles-<?=$ID?> #<?=$ID?>tile-<?=$arItem["ID"]?> .tiles_content{
                                    opacity: 1;
                                }
                                #tiles-<?=$ID?> #<?=$ID?>tile-<?=$arItem["ID"]?>:before{
                                    display: none;
                                }
                            <?}?>
                        <?if(!empty($v)){?>}<?}?>
                    <?}?>
                <?}?>
            <?}?>
            <?foreach($arMedia as $k=>$v){?>
                <?if(!empty($v)){?>@media screen and (<?=$v?>){<?}?>
                    .tiles_fix{
                        padding: <?=$arTilesHeight[$k]?>% 0 0 0;
                    }
                <?if(!empty($v)){?>}<?}?>
            <?}?>
        </style>
        <?
        $style = ob_get_contents();
        ob_end_clean();
        $style = preg_replace(
            array("/\r/","/\n/","/\s+/","/\{\s/","/\s\}/","/\s\{/","/\}\s/","/\s:/","/:\s/","/\s;/","/;\s/"),
            array("",""," ","{","}","{","}",":",":",";",";"),
            $style
        );
        echo $style;
        ?>
        <?if($_SESSION["SESS_INCLUDE_AREAS"] || (!empty($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] == "Y")){?>
            <?if(isset($arParams["SECTION_USER_FIELDS"]) && !empty($arResult["ID"])){?>
                <input type="hidden" name="IBLOCK_SECTION_ID" value="<?=$arResult["ID"]?>">
            <?}?>
            <?foreach($arMedia as $k=>$v){?>
                <?if(isset($arParams["SECTION_USER_FIELDS"])){?>
                    <?
                    if(empty($arParams["UF_".$k])){
                        $arParams["PREVIEW_SIZE_".$k] = (int)$arParams["PREVIEW_SIZE_".$k];
                        $arParams["PREVIEW_SIZE_".$k] = max(1,$arParams["PREVIEW_SIZE_".$k]);
                        $arParams["UF_".$k] = $arParams["PREVIEW_SIZE_".$k];
                    }
                    ?>
                    <span
                        class="tiles_grid_uf
                        <?if(!empty($v)) {?>
                            is-show-in-<?=strtolower($k)?>-media
                        <?}else{?>
                            is-show-in-base-media
                        <?}?>
                    ">
                        <label>Ширина сетки (раздел)</label>
                        <input type="number" name="UF_<?=$k?>" min="1" value="<?=$arParams["UF_".$k]?>">
                    </span>
                <?}?>
                <span
                    class="tiles_media
                    <?if(!empty($v)) {?>
                        is-show-in-<?=strtolower($k)?>-media
                    <?}else{?>
                        is-show-in-base-media
                    <?}?>
                "><?=$k?> <?=$v?></span>
            <?}?>
        <?}?>
        <?foreach($arResult["ITEMS"] as $arItem){?>
            <?
            if(
                (
                    $arItem["TYPE"] == "PORTFOLIO" &&
                    $arItem["PROPERTIES"]["ARCHIVE"]["VALUE"] != "Y"
                ) || (
                    $arItem["TYPE"] == "BANNER"
                )
            ){
                $this->AddEditAction("tile-".$arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"],"ELEMENT_EDIT"));
                $this->AddDeleteAction("tile-".$arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
            ?>
                <?if($_SESSION["SESS_INCLUDE_AREAS"] || (!empty($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] == "Y")){?>
                    <div
                <?}else{?>
                    <?if(!empty($arItem['DETAIL_PAGE_URL'])){?>
                        <a href="<?=$arItem['DETAIL_PAGE_URL']?>"
                    <?}elseif(!empty($arItem['PROPERTIES']['LINK']['VALUE'])){?>
                        <a href="<?=$arItem['PROPERTIES']['LINK']['VALUE']?>"
                    <?}else{?>
                        <div
                    <?}?>
                <?}?>
                    class="tiles_item <?if($arItem["TYPE"] == "BANNER"){?>is-banner<?}?>"
                    id="<?=$this->GetEditAreaId("tile-".$arItem["ID"]);?>"
                    <?if($_SESSION["SESS_INCLUDE_AREAS"] || (!empty($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] == "Y")){?>
                        <?
                        $arSettings = (array)json_decode($arItem["PROPERTIES"]["TILE_SETTING"]["~VALUE"]["TEXT"],true);
                        $arSettings["BASE"] = !empty($arSettings["BASE"])?$arSettings["BASE"]:array();

                        foreach($arMedia as $k=>$v){
                            $arSettings["BASE"][$k] = !empty($arSettings["BASE"][$k])?$arSettings["BASE"][$k]:array();
                            $arSettings["BASE"][$k]["SIZE"] = !empty($arSettings["BASE"][$k]["SIZE"])?$arSettings["BASE"][$k]["SIZE"]:array(1,1);
                            $arSettings["BASE"][$k]["POSITION"] = !empty($arSettings["BASE"][$k]["POSITION"])?$arSettings["BASE"][$k]["POSITION"]:array(0,0);
                            $arSettings["BASE"][$k]["LIGHT"] = !empty($arSettings["BASE"][$k]["LIGHT"])?$arSettings["BASE"][$k]["LIGHT"]:"N";
                        }

                        $arSettings[$currentDir] = !empty($arSettings[$currentDir])?$arSettings[$currentDir]:$arSettings["BASE"];
                        ?>
                        data-tile-medias="<?=strtolower(implode(",",array_keys($arMedia)))?>"
                        <?foreach($arMedia as $k=>$v){?>
                            <?
                            $arSetting = $arSettings[$currentDir][$k];
                            $arGrid = $arParams["PREVIEW_SIZE_".$k];
                            ?>
                            data-tile-<?=strtolower($k)?>-media="<?=$v?>"
                            data-tile-<?=strtolower($k)?>-size="<?=implode(",",$arSetting["SIZE"])?>"
                            data-tile-<?=strtolower($k)?>-position="<?=implode(",",$arSetting["POSITION"])?>"
                            data-tile-<?=strtolower($k)?>-grid="<?=$arGrid?>"
                            data-tile-<?=strtolower($k)?>-light="<?=$arSetting["LIGHT"]?>"
                        <?}?>
                    <?}?>
                >
                    <?if($_SESSION["SESS_INCLUDE_AREAS"] || (!empty($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] == "Y")){?>
                        <span class="tiles_move"></span>
                        <span class="tiles_scale"></span>
                        <span class="tiles_light"></span>
                    <?}?>
                    <div class="tiles_bg"></div>
                    <div class="tiles_content">
                        <?if(!empty($arItem["DISPLAY_PROPERTIES"]["URL"]["VALUE"])){?>
                            <div class="tiles_text is-left is-top"><span><span>Сайт</span><br/><?=$arItem["DISPLAY_PROPERTIES"]["URL"]["VALUE"]?></span></div>
                        <?}?>
                        <?if(!empty($arItem["DISPLAY_PROPERTIES"]["TYPE"]["VALUE"])){?>
                            <div class="tiles_text is-right is-bottom"><span><?=$arItem["DISPLAY_PROPERTIES"]["TYPE"]["VALUE"]?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_LEFT_TOP"]["VALUE"])){?>
                            <div class="tiles_text is-left is-top" style="<?=$arItem["PROPERTIES"]["TEXT_LEFT_TOP"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_LEFT_TOP"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_LEFT_MIDDLE"]["VALUE"])){?>
                            <div class="tiles_text is-left is-middle" style="<?=$arItem["PROPERTIES"]["TEXT_LEFT_MIDDLE"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_LEFT_MIDDLE"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_LEFT_BOTTOM"]["VALUE"])){?>
                            <div class="tiles_text is-left is-bottom" style="<?=$arItem["PROPERTIES"]["TEXT_LEFT_BOTTOM"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_LEFT_BOTTOM"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_CENTER_TOP"]["VALUE"])){?>
                            <div class="tiles_text is-center is-top" style="<?=$arItem["PROPERTIES"]["TEXT_CENTER_TOP"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_CENTER_TOP"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_CENTER_MIDDLE"]["VALUE"])){?>
                            <div class="tiles_text is-center is-middle" style="<?=$arItem["PROPERTIES"]["TEXT_CENTER_MIDDLE"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_CENTER_MIDDLE"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_CENTER_BOTTOM"]["VALUE"])){?>
                            <div class="tiles_text is-center is-bottom" style="<?=$arItem["PROPERTIES"]["TEXT_CENTER_BOTTOM"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_CENTER_BOTTOM"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_RIGHT_TOP"]["VALUE"])){?>
                            <div class="tiles_text is-right is-top" style="<?=$arItem["PROPERTIES"]["TEXT_RIGHT_TOP"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_RIGHT_TOP"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_RIGHT_MIDDLE"]["VALUE"])){?>
                            <div class="tiles_text is-right is-middle" style="<?=$arItem["PROPERTIES"]["TEXT_RIGHT_MIDDLE"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_RIGHT_MIDDLE"]["VALUE"])?></span></div>
                        <?}?>
                        <?if(!empty($arItem["PROPERTIES"]["TEXT_RIGHT_BOTTOM"]["VALUE"])){?>
                            <div class="tiles_text is-right is-bottom" style="<?=$arItem["PROPERTIES"]["TEXT_RIGHT_BOTTOM"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_RIGHT_BOTTOM"]["VALUE"])?></span></div>
                        <?}?>
                    </div>
                <?if($_SESSION["SESS_INCLUDE_AREAS"] || (!empty($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] == "Y")){?>
                    </div>
                <?}else{?>
                    <?if(!empty($arItem['DETAIL_PAGE_URL'])){?>
                        </a>
                    <?}elseif(!empty($arItem['PROPERTIES']['LINK']['VALUE'])){?>
                        </a>
                    <?}else{?>
                        </div>
                    <?}?>
                <?}?>
            <?}elseif(
                $arItem["TYPE"] == "PORTFOLIO" &&
                $arItem["PROPERTIES"]["ARCHIVE"]["VALUE"] == "Y"
            ){$archive = true;}?>
        <?}?>
        <div class="tiles_fix"></div>
    </div>
    <?if($archive){?>
        <h4>Проекты в архиве:</h4>
        <ul>
            <?foreach($arResult["ITEMS"] as $arItem){?>
                <?if($arItem["PROPERTIES"]["ARCHIVE"]["VALUE"] == "Y"){?>
                    <li><a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem["NAME"]?></a></li>
                <?}?>
            <?}?>
        </ul>
    <?}?>
<?}?>
<script>
    $(function(){
        $(".tiles").addClass("is-inited");
    });
</script>
<?if($_SESSION["SESS_INCLUDE_AREAS"] || (!empty($_GET["bitrix_include_areas"]) && $_GET["bitrix_include_areas"] == "Y")){?>
<script>
$(function(){
    var tileMove = false;
    var tileScale = false;
    var tileLight = false;
    var tileChange = false;
    var tileMousePosiiton = false;
    $(document).on("mousedown",".tiles_move",
        function(e){
            var tiles = $(this).closest(".tiles");
                tiles.find(".tiles_item").removeClass("is-focus");
            var tile = $(this).closest(".tiles_item").addClass("is-focus");
            tileMove = tile.attr("id");
            tileMousePosiiton = {
                X:e.clientX,
                Y:e.clientY
            };
            tileChange = false;
            e.preventDefault();
            return false;
        }
    );
    $(document).on("mousedown",".tiles_scale",
        function(e){
            var tiles = $(this).closest(".tiles");
                tiles.find(".tiles_item").removeClass("is-focus");
            var tile = $(this).closest(".tiles_item").addClass("is-focus");
            tileScale = tile.attr("id");
            tileMousePosiiton = {
                X:e.clientX,
                Y:e.clientY
            };
            tileChange = false;
            return false;
        }
    );
    $(document).on("mousedown",".tiles_light",
        function(e){
            var tiles = $(this).closest(".tiles");
                tiles.find(".tiles_item").removeClass("is-focus");
            var tile = $(this).closest(".tiles_item").addClass("is-focus");
            tileLight = tile.attr("id");
            tileChange = true;
            return false;
        }
    );
    $(document).on("mouseup",
        function(e){
            if(tileMove || tileScale || tileLight){
                var i,media,currentMedia,matches;
                var that = $("#"+(tileMove||tileScale||tileLight));
                var medias = that.attr("data-tile-medias").split(",");
                currentMedia = "base";
                for(i in medias){
                    if(medias.hasOwnProperty(i)){
                        media = that.attr("data-tile-"+medias[i]+"-media");
                        if(media != ""){
                            matches = window.matchMedia("screen and ("+media+")");
                            if(matches.matches) {
                                currentMedia = medias[i];
                            }
                        }
                    }
                }
                var grid = that.attr("data-tile-"+currentMedia+"-grid");
                var gridStep = that.closest(".tiles").width()/grid;
                var size = [
                    Math.round(that.outerHeight()/gridStep),
                    Math.round(that.outerWidth()/gridStep)
                ];
                var position = [
                    Math.round((that.offset().top-that.closest(".tiles").offset().top)/gridStep),
                    Math.round((that.offset().left-that.closest(".tiles").offset().left)/gridStep)
                ];
                var currentSize = that.attr("data-tile-"+currentMedia+"-size").split(",");
                var currentPosition = that.attr("data-tile-"+currentMedia+"-position").split(",");
                var light = that.attr("data-tile-"+currentMedia+"-light");
                if(tileLight){
                    light = light=="Y"?"N":"Y";
                }
                if(
                    tileChange ||
                    currentSize[0] != size[0] ||
                    currentSize[1] != size[1] ||
                    currentPosition[0] != position[0] ||
                    currentPosition[1] != position[1]
                ) {
                    tileChange = false;
                    that.closest(".tiles").find(".tiles_media").addClass("is-saving");
                    that.closest(".tiles").find(".tiles_item").addClass("is-saving");
                    that.attr("data-tile-" + currentMedia + "-size", size.join(","));
                    that.attr("data-tile-" + currentMedia + "-position", position.join(","));
                    $.ajax({
                        "url": "/ajax/portfolioEdit.php",
                        "data": {
                            "ID": (tileMove || tileScale || tileLight).substr(19),
                            "SIZE": size,
                            "POSITION": position,
                            "LIGHT": light,
                            "MEDIA": currentMedia,
                            "PAGE": "<?=$currentDir?>"
                        },
                        "dataType": "json",
                        "method": "POST",
                        "success": function (data) {
                            if (data && data.status == "ok") {
                                $(".tiles").load("<?=$currentDir?>?bitrix_include_areas=Y&clear_cache=Y .tiles>*");
                            }
                        }
                    });
                }
                tileMove = false;
                tileScale = false;
                tileLight = false;
                tileMousePosiiton = false;
                e.preventDefault();
                return false;
            }
        }
    );
    $(document).on("mousemove",
        function(e){
            if(tileMove || tileScale){
                var i,media,currentMedia,matches;
                var that = $("#"+(tileMove||tileScale));
                var medias = that.attr("data-tile-medias").split(",");
                that.removeAttr("style");
                currentMedia = "base";
                for(i in medias){
                    if(medias.hasOwnProperty(i)){
                        media = that.attr("data-tile-"+medias[i]+"-media");
                        if(media != ""){
                            matches = window.matchMedia("screen and ("+media+")");
                            if(matches.matches) {
                                currentMedia = medias[i];
                            }
                        }
                    }
                }
                var size = that.attr("data-tile-"+currentMedia+"-size").split(",");
                var position = that.attr("data-tile-"+currentMedia+"-position").split(",");
                var grid = that.attr("data-tile-"+currentMedia+"-grid");
                var gridStep = that.closest(".tiles").width()/grid;
                var distanceX = (e.clientX - tileMousePosiiton.X);
                var distanceY = (e.clientY - tileMousePosiiton.Y);

                if(tileMove){
                    position[0] = position[0] * 1 + Math.round(distanceY/gridStep);
                    position[0] = position[0]>0?position[0]:0;
                    position[1] = position[1] * 1 + Math.round(distanceX/gridStep);
                    position[1] = position[1]>0?position[1]:0;
                    position[1] = position[1]<(grid-size[1])?position[1]:(grid-size[1]);
                }
                if(tileScale){
                    size[0] = size[0] * 1 + Math.round(distanceY/gridStep);
                    size[0] = size[0]>1?size[0]:1;
                    size[1] = size[1] * 1 + Math.round(distanceX/gridStep);
                    size[1] = size[1]>1?size[1]:1;
                    size[1] = size[1]<(grid-position[1])?size[1]:(grid-position[1]);
                }
                that.css({
                    "margin":""+(position[0]/grid*100)+"% 0 0 "+(position[1]/grid*100)+"%",
                    "padding":""+(size[0]/grid*50)+"% "+(size[1]/grid*50)+"%"
                });
            }
        }
    );
    $(document).on("keyup mouseup",".tiles_grid_uf input",
        function(e){
            var ID = $("input[name='IBLOCK_SECTION_ID']").val();
            var PARAMS = $(this).attr("name");
            var VALUE = $(this).val();
            $(this).closest(".tiles").find(".tiles_media").addClass("is-saving");
            $(this).closest(".tiles").find(".tiles_item").addClass("is-saving");
            $.ajax({
                "url": "/ajax/portfolioSectionEdit.php",
                "data": {
                    "ID": ID,
                    "PARAMS": PARAMS,
                    "VALUE": VALUE
                },
                "dataType": "json",
                "method": "POST",
                "success": function (data) {
                    if (data && data.status == "ok") {
                        $(".tiles").load("<?=$currentDir?>?bitrix_include_areas=Y&clear_cache=Y .tiles>*");
                    }
                }
            });
            return false;
        }
    );
});
</script>
<?}?>
