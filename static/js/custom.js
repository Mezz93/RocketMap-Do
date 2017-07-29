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
    const motdTitle = 'Update!'
    const motd = '<span style="font-weight:bold;">Legendary Raids sind nun verfügbar auf der Map!</span><br/><br/>' +
					'<span style="color:red;">Besucht unseren Discordserver und tauscht euch über Raidtreffen und Chats aus (Menü unter Discord)</span>'

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
    const maxClusterZoomLevelMobile = 13 // Default: same as desktop
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
})
