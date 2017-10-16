$(function () {
    'use strict'


    /* Settings For Analytics
	<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-103616467-1', 'auto');
  ga('send', 'pageview');

</script>
	*/

    // Google Analytics property ID. Leave empty to disable.
    // Looks like 'UA-XXXXX-Y'.
    const analyticsKey = 'UA-103616467-1'

    // MOTD.
    const motdEnabled = true
    const motdTitle = 'News!'
    const motd = '<span>Solange es Niantic erlaubt, scannen wir für Supporter der Map die <strong>gesamte Map mit IV.</strong><br/>' +
					'<span style="font-size:smaller;">(Für nicht Supporter sind dafür IVs in der Innenstadt sichtbar)</span><br/>' +
					'<h4 style="margin:0;line-height:1.1;">Die derzeitige Scanzeit ist 7:00 Uhr - 4:00 Uhr</h4>' +
					'<span style="color:red;">Besuche unseren <a href="https://discord.gg/zwsGCUS">Discord</a> für mehr Infos</span><br/>' +
					'<span style="color:red;">oder schau dir auf <a href="https://www.patreon.com/rocketmapdo">Patreon</a> alle Belohnungen an</span>'

    // Only show every unique MOTD message once. If disabled, the MOTD will be
    // shown on every visit. Requires support for localStorage.
    // Updating only the MOTD title (and not the text) will not make the MOTD
    // appear again.
    const motdShowOnlyOnce = true

    // What pages should the MOTD be shown on? By default, homepage and mobile
    // pages.
    const motdShowOnPages = [
        '/',
        '/mobile'
    ]

    // Clustering! Different zoom levels for desktop vs mobile.
    const disableClusters = false // Default: false
    const maxClusterZoomLevel = 12 // Default: 14
    const maxClusterZoomLevelMobile = 12 // Default: same as desktop
    const clusterZoomOnClick = false // Default: false
    const clusterZoomOnClickMobile = false // Default: same as desktop
    const clusterGridSize = 90 // Default: 60
    const clusterGridSizeMobile = 60 // Default: same as desktop

    // Process Pokémon in chunks to improve responsiveness.
    const processPokemonChunkSize = 250 // Default: 100
    const processPokemonChunkSizeMobile = 150 // Default: 100
    const processPokemonIntervalMs = 50 // Default: 100ms
    const processPokemonIntervalMsMobile = 100 // Default: 100ms


    /* Feature detection. */

    const hasStorage = (function () {
        var mod = 'RocketMap'
        try {
            localStorage.setItem(mod, mod)
            localStorage.removeItem(mod)
            return true
        } catch (exception) {
            return false
        }
    }())


    /* Do stuff. */

    const currentPage = window.location.pathname


    // Set custom Store values.
    Store.set('maxClusterZoomLevel', maxClusterZoomLevel)
    Store.set('clusterZoomOnClick', clusterZoomOnClick)
    Store.set('clusterGridSize', clusterGridSize)
    Store.set('processPokemonChunkSize', processPokemonChunkSize)
    Store.set('processPokemonIntervalMs', processPokemonIntervalMs)

    if (typeof window.orientation !== "undefined" || isMobileDevice()) {
        Store.set('maxClusterZoomLevel', maxClusterZoomLevelMobile)
        Store.set('clusterZoomOnClick', clusterZoomOnClickMobile)
        Store.set('clusterGridSize', clusterGridSizeMobile)
		Store.set('processPokemonChunkSize', processPokemonChunkSizeMobile)
		Store.set('processPokemonIntervalMs', processPokemonIntervalMsMobile)
    }

    if (disableClusters) {
        Store.set('maxClusterZoomLevel', -1)
    }

    // Google Analytics.
    if (analyticsKey.length > 0) {
        window.ga = window.ga || function () {
            (ga.q = ga.q || []).push(arguments)
        }
        ga.l = Date.now
        ga('create', analyticsKey, 'auto')
        ga('send', 'pageview')
    }

    // Show MOTD.
    if (motdEnabled && motdShowOnPages.indexOf(currentPage) !== -1) {
        let motdIsUpdated = true

        if (hasStorage) {
            const lastMOTD = window.localStorage.getItem('lastMOTD') || ''

            if (lastMOTD === motd) {
                motdIsUpdated = false
            }
        }

        if (motdIsUpdated || !motdShowOnlyOnce) {
            window.localStorage.setItem('lastMOTD', motd)

            swal({
                title: motdTitle,
                text: '<div style="overflow-y: scroll; max-height: 200px;">' + motd + '</div>',
				html: true
            })
        }
    }
	
	//fix user errors
	Store.set('showActiveRaidsOnly', false)
	Store.set('showOpenGymsOnly', false)
	Store.set('showTeamGymsOnly', 0)
	Store.set('showLastUpdatedGymsOnly', 0)
	Store.set('showScanned', false)
	Store.set('showRanges', false)
	
	
	//TODO: remove
	if(!Store.get('remember_text_perfection_notify')) {
		Store.set('remember_text_perfection_notify', '100')
	}
	
	
	if(window.pokemonLabel) {
		var old_func = pokemonLabel;
		
		window.pokemonLabel = function(item) {
			var name = item['pokemon_name']
			var rarityDisplay = item['pokemon_rarity'] ? '(' + item['pokemon_rarity'] + ')' : ''
			var types = item['pokemon_types']
			var typesDisplay = ''
			var encounterId = item['encounter_id']
			var id = item['pokemon_id']
			var latitude = item['latitude']
			var longitude = item['longitude']
			var disappearTime = item['disappear_time']
			var atk = item['individual_attack']
			var def = item['individual_defense']
			var sta = item['individual_stamina']
			var pMove1 = (moves[item['move_1']] !== undefined) ? i8ln(moves[item['move_1']]['name']) : 'gen/unknown'
			var pMove2 = (moves[item['move_2']] !== undefined) ? i8ln(moves[item['move_2']]['name']) : 'gen/unknown'
			var weight = item['weight']
			var height = item['height']
			var gender = item['gender']
			var form = item['form']
			var cp = item['cp']
			var cpMultiplier = item['cp_multiplier']

			$.each(types, function (index, type) {
				typesDisplay += getTypeSpan(type)
			})
			
			var details = ''

			var contentstring = ''
			var formString = ''
			

			if (id === 201 && form !== null && form > 0) {
				formString += `(${unownForm[item['form']]})`
			}

			contentstring += `
			<div class='pokemon name'>
			  ${name} <span class='pokemon name pokedex'><a href='http://pokemon.gameinfo.io/en/pokemon/${id}' target='_blank' title='View in Pokédex'>#${id}</a></span> ${formString} <span class='pokemon gender rarity'>${genderType[gender - 1]} ${rarityDisplay}</span> ${typesDisplay}
			</div>`

			if (cp != null && cpMultiplier != null) {
				var pokemonLevel = getPokemonLevel(cpMultiplier)

				if (atk != null && def != null && sta != null) {
					var iv = getIv(atk, def, sta)
					var ivString = ''
					if(iv < 50){
					ivString = `<font color ='#96281B'> ${iv.toFixed(1)}</font>`
					}
					else if(iv >= 50 && iv < 75){
						ivString = `<font color ='#E67E22'>${iv.toFixed(1)}</font>`
					}
					else if(iv >= 75 && iv < 90){
						ivString = `<font color ='#3FC380'>${iv.toFixed(1)}</font>`
					}
					else if(iv >= 90 && iv < 97){
						ivString = `<font color ='green'>${iv.toFixed(1)}</font>`
					}
					else{
						ivString = `<font color ='#E9D460'> ${iv.toFixed(1)}</font>`
					}
				}

				contentstring += `
          <div class='pokemon container'>
            <div class='pokemon container content-left'>
              <div>
				<img class='pokemon sprite' src='static/icons/${id}.png'>
				<span class='pokemon'>Level </span><span class='pokemon encounter'><font size='4'>${pokemonLevel}</font></span><br>
				<div>
					<span class='pokemon navigate'><a href='javascript:void(0);' onclick='javascript:openMapDirections(${latitude},${longitude});' title='Mit Google Maps oeffnen'>Route</a></span>
				</div>
				<br>
				<br>
				<br>
				<div class='pokemon'>
					<span class='pokemon links notify'><a href='javascript:notifyAboutPokemon(${id})'>Fav.</a></span><br>
				</div>
				<div class='pokemon'>
					<span class='pokemon links exclude'><a href='javascript:removeNotifyAboutPokemon(${id})'>Fav.</a></span>
				</div>
              </div>
          </div>
          <div class='pokemon container content-right'>
            <div>
              <div class='pokemon disappear'>
                <span class='label-countdown' disappears-at='${disappearTime}'style='background-color: #fffaaa'>00m00s</span> übrig<br><font size='1'>  (Despawn um ${moment(disappearTime).format('HH:mm')})</font>
              </div>
			<div class='pokemon'>
				<font size='4'>IV: <span class='pokemon encounter'><font size='4'>${ivString}%</font></font></span> (${atk}/${def}/${sta})<br>
				<font size='4'>WP: <span class='pokemon encounter'><font size='4'>${cp}</font></font></span>
			</div>
			<div class='pokemon'>
                Moveset: <span class='pokemon encounter'>${pMove1}/${pMove2}</span>
			</div>
			<div class='pokemon'>
                Gewicht: ${weight.toFixed(2)}kg | Größe: ${height.toFixed(2)}m
			</div>
			<br>
			<b>Optionen für ${name}:<br></b>
			<div class='pokemon'>
				<span class='pokemon links exclude'><a href='javascript:excludePokemon(${id})'>Alle ${name} ausblenden</a></span><br>
			<div>
			<div class='pokemon'>
				<span class='pokemon links remove'><a href='javascript:removePokemonMarker("${encounterId}")'>Dieses ${name} ausblenden</a></span>
			</div>
        </div>
      </div>`
			} else if (atk != null && def != null && sta != null) {
				var iv = getIv(atk, def, sta)

				contentstring += `
          <div class='pokemon container'>
            <div class='pokemon container content-left'>
              <div>
				<img class='pokemon sprite' src='static/icons/${id}.png'>
				<span class='pokemon'>Level </span><span class='pokemon no-encounter'><font size='2'>N/A</font></span><br>
				<div>
					<span class='pokemon navigate'><a href='javascript:void(0);' onclick='javascript:openMapDirections(${latitude},${longitude});' title='Mit Google Maps oeffnen'>Route</a></span>
				</div>
				<br>
				<br>
				<br>
				<div class='pokemon'>
					<span class='pokemon links notify'><a href='javascript:notifyAboutPokemon(${id})'>Fav.</a></span><br>
				</div>
				<div class='pokemon'>
					<span class='pokemon links exclude'><a href='javascript:removeNotifyAboutPokemon(${id})'>Fav.</a></span>
				</div>
              </div>
          </div>
          <div class='pokemon container content-right'>
            <div>
              <div class='pokemon disappear'>
                <span class='label-countdown' disappears-at='${disappearTime}'style='background-color: #fffaaa'>00m00s</span> übrig<br><font size='1'>  (Despawn um ${moment(disappearTime).format('HH:mm')})</font>
              </div>
			<div class='pokemon'>
				<font size='4'>IV: <span class='pokemon encounter'><font size='4'>${ivString}%</font></span> (${atk}/${def}/${sta})<br>
				<font size='4'>WP: <span class='pokemon no-encounter'><font size='3'>Gold-Only</font></font></span>
			</div>
			<div class='pokemon'>
                Moveset: <span class='pokemon encounter'>${pMove1}/${pMove2}</span>
			</div>
			<div class='pokemon'>
                Gewicht: ${weight.toFixed(2)}kg | Größe: ${height.toFixed(2)}m
			</div>
			<br>
			<b>Optionen für ${name}:<br></b>
			<div class='pokemon'>
				<span class='pokemon links exclude'><a href='javascript:excludePokemon(${id})'>Alle ${name} ausblenden</a></span><br>
			<div>
			<div class='pokemon'>
				<span class='pokemon links remove'><a href='javascript:removePokemonMarker("${encounterId}")'>Dieses ${name} ausblenden</a></span>
			</div>
        </div>
      </div>`
			} else {
			contentstring += `
			<div class='pokemon container'>
				<div class='pokemon container content-left'>
					<div>
						<img class='pokemon sprite' src='static/icons/${id}.png'><br>
						<span class='pokemon'>Level: </span><span class='pokemon no-encounter'>n/a</span><br>
							<div>
								<span class='pokemon navigate'><a href='javascript:void(0);' onclick='javascript:openMapDirections(${latitude},${longitude});' title='Mit Google Maps oeffnen'>Route</a></span>
								<br>
								<br>
								<br>
								<div class='pokemon'>
								<span class='pokemon links notify'><a href='javascript:notifyAboutPokemon(${id})'>Fav.</a></span><br>
								</div>
								<div class='pokemon'>
								<span class='pokemon links exclude'><a href='javascript:removeNotifyAboutPokemon(${id})'>Fav.</a></span>
							</div>
					</div>
				</div>
			</div>
			<div class='pokemon container content-right'>
				<div>
					<div class='pokemon disappear'>
						<span class='label-countdown' disappears-at='${disappearTime}'style='background-color: #fffaaa'>00m00s</span> verbleibend<br><font size='1'>  (Despawn um ${moment(disappearTime).format('HH:mm')})</font>
					</div>
					<div class='pokemon'>
						<font size='3'>IV: <span class='pokemon no-encounter'><font size='3' color='red'>Nicht bekannt</font></font></span><br>
						<font size='3'>WP: <span class='pokemon no-encounter'><font size='3' color='red'>Nicht bekannt</font></font></span>
					</div>
					<br>
					<b>Optionen für ${name}:<br></b>
					<div class='pokemon'>
						<span class='pokemon links exclude'><a href='javascript:excludePokemon(${id})'>Alle ${name} ausblenden</a></span><br>
					</div>
					<div class='pokemon'>
						<span class='pokemon links remove'><a href='javascript:removePokemonMarker("${encounterId}")'>Dieses ${name} ausblenden</a></span>
					</div>
				</div>
			</div>
			</div>`
			}

			contentstring += `
			  ${details}`

			return contentstring
		};
	}
	
	if(window.sendToastrPokemonNotification) {
		window.sendToastrPokemonNotification = function(title, text, icon, lat, lon) {
			if(!Store.get('doPush')) {
				return
			}
			var notification = toastr.info(text, title, {
				closeButton: true,
				positionClass: 'toast-top-right',
				preventDuplicates: false,
				onclick: function () {
					centerMap(lat, lon, 20)
				},
				showDuration: '300',
				hideDuration: '500',
				timeOut: '6000',
				extendedTimeOut: '1500',
				showEasing: 'swing',
				hideEasing: 'linear',
				showMethod: 'fadeIn',
				hideMethod: 'fadeOut'
			})
			notification.removeClass('toast-info')
			notification.css({
				'padding-left': '36px',
				'background-image': `url('./${icon}')`,
				'background-size': '36px',
				'background-position': 'left top',
				'background-color': '#283747',
				'height': '40px'
			})
			notification.find('.toast-title').css('font-size', 'smaller')
		};
	}
	
	if(window.getNotifyText) {
		window.getNotifyText = function(item) {
			var iv = getIv(item['individual_attack'], item['individual_defense'], item['individual_stamina'])
			var find = ['<prc>', '<pkm>', '<atk>', '<def>', '<sta>']
			var replace = [((iv) ? iv.toFixed(1) : ''), item['pokemon_name'], item['individual_attack'],
				item['individual_defense'], item['individual_stamina']]
			var ntitle = repArray(((iv) ? notifyIvTitle : notifyNoIvTitle), find, replace)
			var dist = moment(item['disappear_time']).format('HH:mm')
			var until = getTimeUntil(item['disappear_time'])
			var udist = (until.hour > 0) ? until.hour + ':' : ''
			udist += lpad(until.min, 2, 0) + 'm' + lpad(until.sec, 2, 0) + 's'
			find = ['<dist>', '<udist>']
			replace = [dist, udist]
			var ntext = repArray(notifyText, find, replace)
			
			return {
				'fav_title': ntitle + '[' + ntext + ']',
				'fav_text': ''
			}
		};
	}
	
	if(window.isNotifyPoke) {
		window.isNotifyPoke = function(poke) {
			const isOnNotifyList = notifiedPokemon.indexOf(poke['pokemon_id']) > -1 || notifiedRarity.indexOf(poke['pokemon_rarity']) > -1
			var hasHighIV = false

			if (poke['individual_attack'] != null) {
				const perfection = getIv(poke['individual_attack'], poke['individual_defense'], poke['individual_stamina'])
				hasHighIV = notifiedMinPerfection > 0 && perfection >= notifiedMinPerfection
			}

			return isOnNotifyList || hasHighIV
		};
	}
})
