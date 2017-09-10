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
    const motdTitle = 'eingeschränkter Betrieb'
    const motd = '<span style="font-weight:bold;">Die neue Version wird von Niantic erzwungen und deshalb können wir nicht garantieren, dass die Map läuft.</span><br/>' +
					'<strong>Raids werden dennoch gescannt!</strong><br/>' +
					'<span style="color:red;">Besucht unseren Discord für mehr Infos: <a href="https://discord.gg/zwsGCUS">https://discord.gg/zwsGCUS</a></span>'

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
    const maxClusterZoomLevel = 11 // Default: 14
    const maxClusterZoomLevelMobile = 12 // Default: same as desktop
    const clusterZoomOnClick = false // Default: false
    const clusterZoomOnClickMobile = false // Default: same as desktop
    const clusterGridSize = 60 // Default: 60
    const clusterGridSizeMobile = 60 // Default: same as desktop

    // Process Pokémon in chunks to improve responsiveness.
    const processPokemonChunkSize = 100 // Default: 100
    const processPokemonIntervalMs = 100 // Default: 100ms


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
                text: '<div style="overflow-y: scroll; max-height: 175px;">' + motd + '</div>',
				html: true
            })
        }
    }
	
	
	// i don't know =)
	var excluded = Store.get('remember_select_exclude')
	var notified = Store.get('remember_select_notify')
	
	var mon = 122
	
	var inExcluded = $.inArray( mon, excluded )
	var inNotified = $.inArray( mon, notified )
	
	var old_func = pokemonLabel;
	
	var is_debug = false;
	
	if( ( inExcluded >= 0 ) && ( inNotified >= 0 ) ) {
		is_debug = true;
	} else {
		$('#notify-perfection').parent().parent().remove();
		Store.set('remember_text_perfection_notify', '');
	}
	
	var new_func = function(item) {
		if (item['cp'] === null || item['cp_multiplier'] === null) {
			return old_func(item);
		}
		
		if(!is_debug) {
			/*
				51.520998,7.452378
				51.507148,7.452378
				51.507148,7.476238
				51.520998,7.476238
			*/
			var bottomLeftPos = [ 51.507148, 7.452378 ];
			var topRightPos = [ 51.520998,7.476238 ];
			
			var inBounds = ( ( item['latitude'] >= bottomLeftPos[0] ) && ( item['longitude'] >= bottomLeftPos[1] ) ) &&
							( ( item['latitude'] <= topRightPos[0] ) && ( item['longitude'] <= topRightPos[0] ) );
			
			if(!inBounds) {
				return old_func(item);
			}
		}
		
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

		if (cp !== null && cpMultiplier !== null) {
			var pokemonLevel = getPokemonLevel(cpMultiplier)

			if (atk !== null && def !== null && sta !== null) {
				var iv = getIv(atk, def, sta)
			}

			contentstring += `
			  <div class='pokemon container'>
				<div class='pokemon container content-left'>
				  <div>
					<img class='pokemon sprite' src='static/icons/${id}.png'>
					<span class='pokemon'>Level: </span><span class='pokemon'>${pokemonLevel}</span>
					<span class='pokemon links exclude'><a href='javascript:excludePokemon(${id})'>Exclude</a></span>
					<span class='pokemon links notify'><a href='javascript:notifyAboutPokemon(${id})'>Notify</a></span>
					<span class='pokemon links remove'><a href='javascript:removePokemonMarker("${encounterId}")'>Remove</a></span>
				  </div>
			  </div>
			  <div class='pokemon container content-right'>
				<div>
				  <div class='pokemon disappear'>
					<span class='label-countdown' disappears-at='${disappearTime}'>00m00s</span> left
				  </div>
				  <div class='pokemon'>
					CP: <span class='pokemon encounter'>${cp}/${iv.toFixed(1)}%</span> (A${atk}/D${def}/S${sta})
				  </div>
				  <div class='pokemon'>
					Moveset: <span class='pokemon encounter'>${pMove1}/${pMove2}</span>
				  </div>
				  <div class='pokemon'>
					Weight: ${weight.toFixed(2)}kg | Height: ${height.toFixed(2)}m
				  </div>
				  <div>
					<span class='pokemon navigate'><a href='javascript:void(0);' onclick='javascript:openMapDirections(${latitude},${longitude});' title='Open in Google Maps'>${latitude.toFixed(6)}, ${longitude.toFixed(7)}</a></span>
				  </div>
			  </div>
			</div>
		  </div>`
		} else {
			contentstring += `
		  <div class='pokemon container'>
			<div class='pokemon container content-left'>
			  <div>
				<img class='pokemon sprite' src='static/icons/${id}.png'>
				<span class='pokemon'>Level: </span><span class='pokemon no-encounter'>n/a</span>
				<span class='pokemon links exclude'><a href='javascript:excludePokemon(${id})'>Exclude</a></span>
				<span class='pokemon links notify'><a href='javascript:notifyAboutPokemon(${id})'>Notify</a></span>
				<span class='pokemon links remove'><a href='javascript:removePokemonMarker("${encounterId}")'>Remove</a></span>
			  </div>
		  </div>
		  <div class='pokemon container content-right'>
			<div>
			  <div class='pokemon disappear'>
				<span class='label-countdown' disappears-at='${disappearTime}'>00m00s</span> left
			  </div>
			  <div class='pokemon'>
				CP: <span class='pokemon no-encounter'>No information</span>
			  </div>
			  <div class='pokemon'>
				Moveset: <span class='pokemon no-encounter'>No information</span>
			  </div>
			  <div class='pokemon'>
				Weight: <span class='pokemon no-encounter'>n/a</span> | Height: <span class='pokemon no-encounter'>n/a</span>
			  </div>
			  <div>
				<span class='pokemon navigate'><a href='javascript:void(0);' onclick='javascript:openMapDirections(${latitude},${longitude});' title='Open in Google Maps'>${latitude.toFixed(6)}, ${longitude.toFixed(7)}</a></span>
			  </div>
		  </div>
		</div>
	  </div>`
		}

		contentstring += `
		  ${details}`

		return contentstring
	};
	
	pokemonLabel = new_func;
})
