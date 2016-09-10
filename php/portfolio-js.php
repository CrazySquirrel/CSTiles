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

$arScreenSizes = array(100,240,320,480,768,1024,1280,1440,1600,1920,2560,3200,3840,4096,5120,6400);

if (!empty($arResult['ITEMS'])){
	$arParams["PREVIEW_SIZE_BASE"] = !empty($arResult["UF_BASE"])?$arResult["UF_BASE"]:$arParams["PREVIEW_SIZE_BASE"];
	$arParams["PREVIEW_MEGA_SCREEN"] = !empty($arResult["UF_MEGA_SCREEN"])?$arResult["UF_MEGA_SCREEN"]:$arParams["PREVIEW_MEGA_SCREEN"];
	$arParams["PREVIEW_HUGE_SCREEN"] = !empty($arResult["UF_HUGE_SCREEN"])?$arResult["UF_HUGE_SCREEN"]:$arParams["PREVIEW_HUGE_SCREEN"];
	$arParams["PREVIEW_LARGE_SCREEN"] = !empty($arResult["UF_LARGE_SCREEN"])?$arResult["UF_LARGE_SCREEN"]:$arParams["PREVIEW_LARGE_SCREEN"];
	$arParams["PREVIEW_SIZE_BASE"] = !empty($arResult["UF_BASE"])?$arResult["UF_BASE"]:$arParams["PREVIEW_SIZE_BASE"];
	$arParams["PREVIEW_SIZE_DESKTOP"] = !empty($arResult["UF_DESKTOP"])?$arResult["UF_DESKTOP"]:$arParams["PREVIEW_SIZE_DESKTOP"];
	$arParams["PREVIEW_SIZE_TABLET"] = !empty($arResult["UF_TABLET"])?$arResult["UF_TABLET"]:$arParams["PREVIEW_SIZE_TABLET"];
	$arParams["PREVIEW_SIZE_PHONE_LANDSCAPE"] = !empty($arResult["UF_PHONE_LANDSCAPE"])?$arResult["UF_PHONE_LANDSCAPE"]:$arParams["PREVIEW_SIZE_PHONE_LANDSCAPE"];
	$arParams["PREVIEW_SIZE_PHONE"] = !empty($arResult["UF_PHONE"])?$arResult["UF_PHONE"]:$arParams["PREVIEW_SIZE_PHONE"];

	$arParams["PREVIEW_SIZE_BASE"] = !empty($arParams["PREVIEW_SIZE_BASE"])?$arParams["PREVIEW_SIZE_BASE"]:"8,auto";
	$arParams["PREVIEW_MEGA_SCREEN"] = !empty($arParams["PREVIEW_MEGA_SCREEN"])?$arParams["PREVIEW_MEGA_SCREEN"]:"8,auto";
	$arParams["PREVIEW_HUGE_SCREEN"] = !empty($arParams["PREVIEW_HUGE_SCREEN"])?$arParams["PREVIEW_HUGE_SCREEN"]:"8,auto";
	$arParams["PREVIEW_LARGE_SCREEN"] = !empty($arParams["PREVIEW_LARGE_SCREEN"])?$arParams["PREVIEW_LARGE_SCREEN"]:"8,auto";
	$arParams["PREVIEW_SIZE_BASE"] = !empty($arParams["PREVIEW_SIZE_BASE"])?$arParams["PREVIEW_SIZE_BASE"]:"8,auto";
	$arParams["PREVIEW_SIZE_DESKTOP"] = !empty($arParams["PREVIEW_SIZE_DESKTOP"])?$arParams["PREVIEW_SIZE_DESKTOP"]:"8,auto";
	$arParams["PREVIEW_SIZE_TABLET"] = !empty($arParams["PREVIEW_SIZE_TABLET"])?$arParams["PREVIEW_SIZE_TABLET"]:"4,auto";
	$arParams["PREVIEW_SIZE_PHONE_LANDSCAPE"] = !empty($arParams["PREVIEW_SIZE_PHONE_LANDSCAPE"])?$arParams["PREVIEW_SIZE_PHONE_LANDSCAPE"]:"4,auto";
	$arParams["PREVIEW_SIZE_PHONE"] = !empty($arParams["PREVIEW_SIZE_PHONE"])?$arParams["PREVIEW_SIZE_PHONE"]:"2,auto";
?>
	<div
		class="cstiles portfolio"
		data-cstiles-size="<?=$arParams["PREVIEW_SIZE_BASE"];?>"
		data-cstiles-size-imac="<?=$arParams["PREVIEW_SIZE_IMAC_SCREEN"];?>"
		data-cstiles-size-mega-screen="<?=$arParams["PREVIEW_SIZE_MEGA_SCREEN"];?>"
		data-cstiles-size-huge-screen="<?=$arParams["PREVIEW_SIZE_HUGE_SCREEN"];?>"
		data-cstiles-size-large-screen="<?=$arParams["PREVIEW_SIZE_LARGE_SCREEN"];?>"
		data-cstiles-size-desktop="<?=$arParams["PREVIEW_SIZE_DESKTOP"];?>"
		data-cstiles-size-tablet="<?=$arParams["PREVIEW_SIZE_TABLET"];?>"
		data-cstiles-size-phone-landscape="<?=$arParams["PREVIEW_SIZE_PHONE_LANDSCAPE"];?>"
		data-cstiles-size-phone="<?=$arParams["PREVIEW_SIZE_PHONE"];?>"
	>
		<?$arch = false?>
		<?foreach($arResult["ITEMS"] as $arItem){?>
			<?
			if($arItem["PROPERTIES"]["ARCHIVE"]["VALUE"] != "Y"){
				if(empty($arItem["PROPERTIES"]["PREVIEW_IMAGES"]["VALUE"]) && $arItem["TYPE"] != "BANNER"){
					$arItem["PREVIEW_PICTURE_100"] = array(
						"src"=>CompressImages("/local/templates/webprofy/images/portfoilo_nophoto.jpg")
					);
				}elseif(!empty($arItem["PROPERTIES"]["PREVIEW_IMAGES"]["VALUE"])){
					$arItem["PREVIEW_PICTURE"] = CFile::GetByID($arItem["PROPERTIES"]["PREVIEW_IMAGES"]["VALUE"][0])->Fetch();
					$src = "/upload/".$arItem["PREVIEW_PICTURE"]["SUBDIR"]."/".$arItem["PREVIEW_PICTURE"]["FILE_NAME"];
					foreach($arScreenSizes as $size){
						$arItem["PREVIEW_PICTURE_".$size] = CFile::ResizeImageGet($arItem["PREVIEW_PICTURE"], Array("width" => $size, "height" => $size));
						$arItem["PREVIEW_PICTURE_".$size]["src"] = !empty($arItem["PREVIEW_PICTURE_".$size]["src"])?$arItem["PREVIEW_PICTURE_".$size]["src"]:$src;
						$arItem["PREVIEW_PICTURE_".$size]["src"] = CompressImages($arItem["PREVIEW_PICTURE_".$size]["src"]);
					}
				}
				$pages = array("BASE");
				$pages = array_merge($pages,array_keys(json_decode($arItem["PROPERTIES"]["TILE_SETTINGS"]["~VALUE"]["TEXT"],true)));
				$pages[] = $APPLICATION->GetCurPage();
				$pages = array_unique($pages);
				$settings = json_decode($arItem["PROPERTIES"]["TILE_SETTINGS"]["~VALUE"]["TEXT"],true);
				$settings = !empty($settings[$APPLICATION->GetCurPage()])?$settings[$APPLICATION->GetCurPage()]:$settings["BASE"];
			?>
				<?if($arItem["TYPE"] == "PORTFOLIO"){?>
					<a
						href="<?=$arItem['DETAIL_PAGE_URL']?>"
						class="cstiles__item"
						data-id="<?=$arItem['ID']?>"
						data-page="<?=$APPLICATION->GetCurDir()?>"
						data-pages="<?=implode("|",$pages)?>"
						data-dark="<?if($arItem["PROPERTIES"]["PREVIEW_PICTURE_DARK"]["VALUE"]=="Y"){echo"Y";}else{echo"N";}?>"
						<?if(!empty($settings["BASE"])){?>data-cstiles-size="<?=str_replace("x",",",$settings["BASE"])?>"<?}?>
						<?if(!empty($settings["IMAC_SCREEN"])){?>data-cstiles-size-imac="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["MEGA_SCREEN"])){?>data-cstiles-size-mega-screen="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["HUGE_SCREEN"])){?>data-cstiles-size-huge-screen="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["LARGE_SCREEN"])){?>data-cstiles-size-large-screen="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["DESKTOP"])){?>data-cstiles-size-desktop="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["TABLET"])){?>data-cstiles-size-tablet="<?=str_replace("x",",",$settings["TABLET"])?>"<?}?>
						<?if(!empty($settings["PHONE_LANDSCAPE"])){?>data-cstiles-size-phone-landscape="<?=str_replace("x",",",$settings["PHONE_LANDSCAPE"])?>"<?}?>
						<?if(!empty($settings["PHONE"])){?>data-cstiles-size-phone="<?=str_replace("x",",",$settings["PHONE"])?>"<?}?>
					>
						<?if(!empty($arItem["PREVIEW_PICTURE_100"]["src"])){?>
							<img
								class="cstiles__item-image"
								src="<?=$arItem["PREVIEW_PICTURE_100"]["src"]?>"
								<?foreach($arScreenSizes as $size){?>
									<?if(!empty($arItem["PREVIEW_PICTURE_".$size]["src"])){?>
										data-image-size-<?=$size?>="<?=$arItem["PREVIEW_PICTURE_".$size]["src"]?>"
									<?}?>
								<?}?>
							>
						<?}?>

							<?if($USER->IsAdmin()){?><div class="cstiles__edit-button" data-id="<?=$arItem["ID"]?>"></div><?}?>
							<div class="cstiles__item-hover-block">
								<div class="cstiles__item-text is-left is-top"><span><span>Сайт</span><br/><?=$arItem["DISPLAY_PROPERTIES"]["URL"]["VALUE"]?></span></div>
								<div class="cstiles__item-text is-right is-bottom"><span><?=$arItem["DISPLAY_PROPERTIES"]["TYPE"]["VALUE"]?></span></div>
							</div>

					</a>
				<?}else{?>
					<?if(!empty($arItem['PROPERTIES']['LINK']['VALUE'])){?>
						<a
						href="<?=$arItem['DETAIL_PAGE_URL']?>"
					<?}else{?>
						<div
					<?}?>
						class="cstiles__item"
						data-id="<?=$arItem['ID']?>"
						data-page="<?=$APPLICATION->GetCurDir()?>"
						data-pages="<?=implode("|",$pages)?>"
						data-cstiles-auto_clone="N"
						<?if(!empty($settings["BASE"])){?>data-cstiles-size="<?=str_replace("x",",",$settings["BASE"])?>"<?}?>
						<?if(!empty($settings["IMAC_SCREEN"])){?>data-cstiles-size-imac="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["MEGA_SCREEN"])){?>data-cstiles-size-mega-screen="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["HUGE_SCREEN"])){?>data-cstiles-size-huge-screen="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["LARGE_SCREEN"])){?>data-cstiles-size-large-screen="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["DESKTOP"])){?>data-cstiles-size-desktop="<?=str_replace("x",",",$settings["DESKTOP"])?>"<?}?>
						<?if(!empty($settings["TABLET"])){?>data-cstiles-size-tablet="<?=str_replace("x",",",$settings["TABLET"])?>"<?}?>
						<?if(!empty($settings["PHONE_LANDSCAPE"])){?>data-cstiles-size-phone-landscape="<?=str_replace("x",",",$settings["PHONE_LANDSCAPE"])?>"<?}?>
						<?if(!empty($settings["PHONE"])){?>data-cstiles-size-phone="<?=str_replace("x",",",$settings["PHONE"])?>"<?}?>
					>
						<?if(!empty($arItem["PREVIEW_PICTURE_100"]["src"])){?>
							<img
								class="cstiles__item-image"
								src="<?=$arItem["PREVIEW_PICTURE_100"]["src"]?>"
								<?foreach($arScreenSizes as $size){?>
									<?if(!empty($arItem["PREVIEW_PICTURE_".$size]["src"])){?>
										data-image-size-<?=$size?>="<?=$arItem["PREVIEW_PICTURE_".$size]["src"]?>"
									<?}?>
								<?}?>
							>
						<?}?>
						<div class="cstiles__item-content-inner">
							<?if($USER->IsAdmin()){?><div class="cstiles__edit-button" data-id="<?=$arItem["ID"]?>"></div><?}?>
							<div class="cstiles__item-text is-left is-top" style="<?=$arItem["PROPERTIES"]["TEXT_LEFT_TOP"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_LEFT_TOP"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-left is-middle" style="<?=$arItem["PROPERTIES"]["TEXT_LEFT_MIDDLE"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_LEFT_MIDDLE"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-left is-bottom" style="<?=$arItem["PROPERTIES"]["TEXT_LEFT_BOTTOM"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_LEFT_BOTTOM"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-center is-top" style="<?=$arItem["PROPERTIES"]["TEXT_CENTER_TOP"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_CENTER_TOP"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-center is-middle" style="<?=$arItem["PROPERTIES"]["TEXT_CENTER_MIDDLE"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_CENTER_MIDDLE"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-center is-bottom" style="<?=$arItem["PROPERTIES"]["TEXT_CENTER_BOTTOM"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_CENTER_BOTTOM"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-right is-top" style="<?=$arItem["PROPERTIES"]["TEXT_RIGHT_TOP"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_RIGHT_TOP"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-right is-middle" style="<?=$arItem["PROPERTIES"]["TEXT_RIGHT_MIDDLE"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_RIGHT_MIDDLE"]["VALUE"])?></span></div>
							<div class="cstiles__item-text is-right is-bottom" style="<?=$arItem["PROPERTIES"]["TEXT_RIGHT_BOTTOM"]["DESCRIPTION"]?>"><span><?=htmlspecialchars_decode($arItem["PROPERTIES"]["TEXT_RIGHT_BOTTOM"]["VALUE"])?></span></div>
						</div>
					<?if(!empty($arItem['PROPERTIES']['LINK']['VALUE'])){?>
						</a>
					<?}else{?>
						</div>
					<?}?>
				<?}?>
			<?}else{$arch = true;}?>
		<?}?>
	</div>
	<?if($arch){?>
		</div>
			<h4>Проекты в архиве:</h4>
			<ul>
				<?foreach($arResult["ITEMS"] as $arItem){?>
					<?if($arItem["PROPERTIES"]["ARCHIVE"]["VALUE"] == "Y"){?>
						<li><a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem["NAME"]?></a></li>
					<?}?>
				<?}?>
			</ul>
		<div class="inset-block">
	<?}?>
	<div class="tile-edit-form order-form">
		<form class="ajax-form" action="/ajax/portfolio-edit.php" method="POST" data-success="Изменения сохранены">
			<div class="order-form__row">
				<label>Цвет фона у анонса темный <input type="checkbox" value="Y" name="PREVIEW_PICTURE_DARK"></label>
			</div>
			<div class="order-form__row">
				<select name="PAGE" class="is-focus"></select>
				<label class="is-placeholder">Для страницы</label>
			</div>
			<div class="order-form__row">
				<input type="hidden" value="" name="ID">
				<input type="text" value="" name="PREVIEW_SIZE_IMAC_SCREEN">
				<label class="is-placeholder">Размер блока анонса (imac)</label>
			</div>
			<div class="order-form__row">
				<input type="hidden" value="" name="ID">
				<input type="text" value="" name="PREVIEW_SIZE_MEGA_SCREEN">
				<label class="is-placeholder">Размер блока анонса (огромный)</label>
			</div>
			<div class="order-form__row">
				<input type="hidden" value="" name="ID">
				<input type="text" value="" name="PREVIEW_SIZE_HUGE_SCREEN">
				<label class="is-placeholder">Размер блока анонса (большой)</label>
			</div>
			<div class="order-form__row">
				<input type="hidden" value="" name="ID">
				<input type="text" value="" name="PREVIEW_SIZE_LARGE_SCREEN">
				<label class="is-placeholder">Размер блока анонса (крупный)</label>
			</div>
			<div class="order-form__row">
				<input type="hidden" value="" name="ID">
				<input type="text" value="" name="PREVIEW_SIZE_BASE">
				<label class="is-placeholder">Размер блока анонса (основной)</label>
			</div>
			<div class="order-form__row">
				<input type="text" value="" name="PREVIEW_SIZE_DESKTOP">
				<label class="is-placeholder">Размер блока анонса (десктоп)</label>
			</div>
			<div class="order-form__row">
				<input type="text" value="" name="PREVIEW_SIZE_TABLET">
				<label class="is-placeholder">Размер блока анонса (планшет)</label>
			</div>
			<div class="order-form__row">
				<input type="text" value="" name="PREVIEW_SIZE_PHONE_LANDSCAPE">
				<label class="is-placeholder">Размер блока анонса (телефон горизонтально)</label>
			</div>
			<div class="order-form__row">
				<input type="text" value="" name="PREVIEW_SIZE_PHONE">
				<label class="is-placeholder">Размер блока анонса (телефон вертикально)</label>
			</div>
			<div class="order-form__row">
				<input type="submit" class="submit button" value="Сохранить">
			</div>
		</form>
	</div>
<?
}
?>