"use strict";
/**
 * Wrapper for thisissoon API. Handles retrieving of project and category data
 * @module thisissoon.api
 * @author SOON_
 * @class ThisissoonAPI
 */
angular.module("thisissoon.api").service("ThisissoonAPI", [
    "$q",
    "$http",
    "ENV",
    /**
     * @constructor
     * @param {Service} $q    Angularjs deferred promised service
     * @param {Service} $http Angularjs XHR wrapper service
     */
    function ($q, $http, ENV) {

        /**
         * Retrieves a object that contains the details of a project
         * @function getProjectDetail
         * @param  {String}  slug The unique slug identifier for project
         * @return {Promise} A promise that will resolve if the project
         *                   exists or be rejected if it does not
         * @example
         * ThisissoonAPI.getProjectDetail("doit")
         *     .then(function(projectObj){
         *         console.log(projectObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Project Found")
         *         // error handling code
         *     })
         */
        this.getProjectDetail = function getProjectDetail(slug){
            var deferred = $q.defer();

//            $http.get(ENV.API_ADDRESS + "projects/" + slug + "/")
//                .success(function (data) {
//                    deferred.resolve(data);
//                })
//                .error(function (data) {
//                    deferred.reject(data);
//                });
            deferred.resolve({"id":4,"slug":"do-itorg","title":"Do-it.org","introduction":"Useful, innovative, game-changing. Our contribution to the complete re-birth of the UK’s first online volunteer matching service","description_headline":"Re-inventing the UK’s #1 volunteering website","description_text":"Do-it was one of our founding clients and a total passion project for SOON_ After years of commercial digital work, it was incredibly motivating to work on a project for a different sector that has meaningful, grass roots impact. Everyone at SOON_ poured their heart and soul in to the project - and we continue to do so, supporting the project after launch and committing to a 3 year program of new work and upgrades.\r\n\r\nHighlights of the project included working with Do-it’s genuinely inspirational & visionary CEO, Jamie Ward-Smith - a man who is changing his industry. We also teamed up with some amazing partners - including sector recruitment specialist Prospectus and the UK Cabinet Office who grant fund the service. Don’t buy in to the cynicism - we’ve seen first hand that there are people in government who get it, can take risks and really, really care.","project_stats":[{"stat":{"title":"number of organisations"},"value":"40k+"},{"stat":{"title":"new opportunities per week"},"value":"1500+"},{"stat":{"title":"opportunities available"},"value":"160k+"},{"stat":{"title":"increase in traffic"},"value":"10%"}],"quote":"I am pretty blown away by what you’ve all achieved and am extremely grateful for giving us such a great new platform; it’s going to have a huge impact - so thank you very, very much.","quote_attribution":"Jamie Ward-Smith, CEO - Do-it Trust","link":"http://www.do-it.org/","hero_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/doit1_main_Cu6csfZ/2ef89d181ec0d26e5da2df23ff7fcbb2.jpg","video":"/media/CACHE/images/doit1_main_Cu6csfZ/d0abe29c5f348a7142fbfc13d0fd64b6.jpg","medium":"/media/CACHE/images/doit1_main_Cu6csfZ/c94e064e74939c8e0c4a0395ae4036ff.jpg","small":"/media/CACHE/images/doit1_main_Cu6csfZ/9b4b0e9f9a3ebbd9c03ebc9bc60554b9.jpg","thumbnail":"/media/CACHE/images/doit1_main_Cu6csfZ/704a70f9620cfb068a7faf1b3c5ca6c9.jpg"},"project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/doit_logo_beAoqt4/eb9d12a56ebe63c020675aa87d3da208.jpg","video":"/media/CACHE/images/doit_logo_beAoqt4/fe502a288f18cf3411b262061169c525.jpg","medium":"/media/CACHE/images/doit_logo_beAoqt4/956e53a8d0f9055301890e97b63e2a1f.jpg","small":"/media/CACHE/images/doit_logo_beAoqt4/e735b3c8e0012d3a8cc8ef9c79c8d959.jpg","thumbnail":"/media/CACHE/images/doit_logo_beAoqt4/ab4db0f9e714ff94082d2f94a33ca593.jpg"},"image_carousel":[],"stacked_images":[{"caption":"Do-it changes the prevailing paradigm and puts the volunteer at the heart of the experience - pushing tailored, personalised content to them, helping them manage their volunteering and creating a public volunteer CV to share with potential employers.","text_colour":"#000000","background_colour":"#c1d3c2","huge":"/media/CACHE/images/doit2_00AJEib/2b875b2337f41da5c47fab82023746ee.jpg","video":"/media/CACHE/images/doit2_00AJEib/0ddb60c06bb6f6b963a97a495d247165.jpg","medium":"/media/CACHE/images/doit2_00AJEib/1b3956c84d918baa920ffe2675c7b799.jpg","small":"/media/CACHE/images/doit2_00AJEib/d9ce6d73dce54ead971d4d290dd4bec0.jpg","thumbnail":"/media/CACHE/images/doit2_00AJEib/01ef7a4f3c2f02735f12aae080cd5835.jpg"},{"caption":"The project was all about making complex systems simple. This begins with the volunteer dashboard - one interface that continually reassures users about the state of their applications, volunteering sessions and the outcome. ","text_colour":"#000000","background_colour":"#c1d3c2","huge":"/media/CACHE/images/doit3_DpoPPCu/f212eb08accc110cb35ab43a968a32da.jpg","video":"/media/CACHE/images/doit3_DpoPPCu/bb3d16108083bfe99a34b0094e6963b9.jpg","medium":"/media/CACHE/images/doit3_DpoPPCu/a54ebae5032a83aa1e4426d32e884ce3.jpg","small":"/media/CACHE/images/doit3_DpoPPCu/06d449c028a8497b7ff5b93852615073.jpg","thumbnail":"/media/CACHE/images/doit3_DpoPPCu/cfa70430209efb42f228d3386e294d3f.jpg"},{"caption":"For the first time, organisations can use Do-it.org to recruit volunteers direct by creating a profile and “self-serving” - recruiting, tracking applicants and managing response all through the system.","text_colour":"#e2e9e2","background_colour":"#8d998d","huge":"/media/CACHE/images/doit4_tMpH8xM/006b3803da47b5db1cdd272f7a87f8c9.jpg","video":"/media/CACHE/images/doit4_tMpH8xM/e2bf9c72c79d3a5150a158ba66f6c32d.jpg","medium":"/media/CACHE/images/doit4_tMpH8xM/b7abbca947cf8912bb7aab4ad7132917.jpg","small":"/media/CACHE/images/doit4_tMpH8xM/c0a9f962e6330be85cffa4752d6a2eb6.jpg","thumbnail":"/media/CACHE/images/doit4_tMpH8xM/3c150b123cd8035a52abbff768386d85.jpg"},{"caption":"Built on top of our RESTful JSON API, the Do-it web service allows customers to integrate Do-it features in to their existing systems. Only a month after launch we’re already powering volunteer search for Marie Curie and youth volunteering site vinspired.","text_colour":"#363636","background_colour":"#e0dfda","huge":"/media/CACHE/images/doit5_da40JsW/cda91c0dec736d24a2745f8eb05f1632.jpg","video":"/media/CACHE/images/doit5_da40JsW/b994e17c15d99b12a32756770d41102f.jpg","medium":"/media/CACHE/images/doit5_da40JsW/e4f610085b669fae7c84efbf78c322d1.jpg","small":"/media/CACHE/images/doit5_da40JsW/e2995b3e4fee66696ee6918e669bb75e.jpg","thumbnail":"/media/CACHE/images/doit5_da40JsW/63af0681685ec3e185169b239e7190c3.jpg"}],"background_colour":"#e0dfda","tint_colour":"#e2ede2","text_colour":"#000000","video":{"mp4": "img/mock/netted-video.mp4","image": ""}});

            return deferred.promise;
        };

        /**
         * Retrieves a object that contains the list of projects
         * and a sticky project
         * @function getProjects
         * @return   {Promise} A promise that will resolve if the project
         *                   exists or be rejected if it does not
         * @example
         * ThisisssoonAPI.getProjects()
         *     .then(function(projectsObj){
         *         console.log(projectsObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Project Found")
         *         // error handling code
         *     })
         */
        this.getProjects = function getProjects(){
            var deferred = $q.defer();

//            $http.get(ENV.API_ADDRESS + "projects/")
//                .success(function (data) {
//                    deferred.resolve(data);
//                })
//                .error(function (data) {
//                    deferred.reject(data);
//                });
            deferred.resolve({"list":[{"id":4,"slug":"do-itorg","title":"Do-it.org","introduction":"Useful, innovative, game-changing. Our contribution to the complete re-birth of the UK’s first online volunteer matching service","description_headline":"Re-inventing the UK’s #1 volunteering website","description_text":"Do-it was one of our founding clients and a total passion project for SOON_ After years of commercial digital work, it was incredibly motivating to work on a project for a different sector that has meaningful, grass roots impact. Everyone at SOON_ poured their heart and soul in to the project - and we continue to do so, supporting the project after launch and committing to a 3 year program of new work and upgrades.\r\n\r\nHighlights of the project included working with Do-it’s genuinely inspirational & visionary CEO, Jamie Ward-Smith - a man who is changing his industry. We also teamed up with some amazing partners - including sector recruitment specialist Prospectus and the UK Cabinet Office who grant fund the service. Don’t buy in to the cynicism - we’ve seen first hand that there are people in government who get it, can take risks and really, really care.","project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/doit_logo_beAoqt4/eb9d12a56ebe63c020675aa87d3da208.jpg","video":"/media/CACHE/images/doit_logo_beAoqt4/fe502a288f18cf3411b262061169c525.jpg","medium":"/media/CACHE/images/doit_logo_beAoqt4/956e53a8d0f9055301890e97b63e2a1f.jpg","small":"/media/CACHE/images/doit_logo_beAoqt4/e735b3c8e0012d3a8cc8ef9c79c8d959.jpg","thumbnail":"/media/CACHE/images/doit_logo_beAoqt4/ab4db0f9e714ff94082d2f94a33ca593.jpg"},"overview_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/doit_preview_dYRMycb/54cb42da8d3e5a2966cc861a227462e2.jpg","video":"/media/CACHE/images/doit_preview_dYRMycb/ff2195c1968ad30cb09beb8dfd05e44b.jpg","medium":"/media/CACHE/images/doit_preview_dYRMycb/0204fba971f7340f10e1e87e071a1d7b.jpg","small":"/media/CACHE/images/doit_preview_dYRMycb/4ca9b2d50725315d2a4aaab76df02e85.jpg","thumbnail":"/media/CACHE/images/doit_preview_dYRMycb/88ceda7f952018b5295f32bf307f86a8.jpg"},"hero_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/doit1_main_Cu6csfZ/2ef89d181ec0d26e5da2df23ff7fcbb2.jpg","video":"/media/CACHE/images/doit1_main_Cu6csfZ/d0abe29c5f348a7142fbfc13d0fd64b6.jpg","medium":"/media/CACHE/images/doit1_main_Cu6csfZ/c94e064e74939c8e0c4a0395ae4036ff.jpg","small":"/media/CACHE/images/doit1_main_Cu6csfZ/9b4b0e9f9a3ebbd9c03ebc9bc60554b9.jpg","thumbnail":"/media/CACHE/images/doit1_main_Cu6csfZ/704a70f9620cfb068a7faf1b3c5ca6c9.jpg"},"link":"http://www.do-it.org/","background_colour":"#e0dfda","tint_colour":"#e2ede2","text_colour":"#000000"},{"id":3,"slug":"the-lovie-letters","title":"The Lovie Letters","introduction":"Europe’s best digital creative work, condensed into one lovely website\r\n","description_headline":"There’s a lot of love in the room","description_text":"With no shortage of awards sites online, when we were approach by The Lovie Awards & Google our first thought was to find a fresh spin on the concept of a showcase website. Cue the Lovie Letters; over sixty genuine “love letters” to the work, digging behind the scenes in to the creative process, the scary challenges, the punch-ups and the celebrations in a warts-and-all review. This was all wrapped up in a fully content managed, responsive, API driven website, chock full of Google goodness that made the sponsorship come alive. Overall, the campaign was so successful that it is likely to run for another 2-3 years - with the best of every year’s awards winners being invited to contribute.","project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/lovie_logo_kCHEmGS/6bda3aadebf8a179d5b43d733e8b34a9.jpg","video":"/media/CACHE/images/lovie_logo_kCHEmGS/8cdaaab1990d296d1eaebbcbd4677d8c.jpg","medium":"/media/CACHE/images/lovie_logo_kCHEmGS/fe7e3bf3e8d1caca781eca9ae8b959fa.jpg","small":"/media/CACHE/images/lovie_logo_kCHEmGS/1e6e57aa7015f9428cca2225910a0ccf.jpg","thumbnail":"/media/CACHE/images/lovie_logo_kCHEmGS/6a3d341ea24e2bf8ea1ce84a99c836d3.jpg"},"overview_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/lovie_preview/9c02b37f221f17b53739fca2aba97d40.jpg","video":"/media/CACHE/images/lovie_preview/dbc8a1e4955f1b96d7db63a1d6828d4d.jpg","medium":"/media/CACHE/images/lovie_preview/9bf1f37bbf4e11aa5ac7abca4dfe5cbc.jpg","small":"/media/CACHE/images/lovie_preview/76f61009a4923fa0f165c872ffb11e42.jpg","thumbnail":"/media/CACHE/images/lovie_preview/41ce1403ede79355ec58de6ae689e279.jpg"},"hero_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/lovie1_main/4c92e6136c1daef079f4efb5236bc5e1.jpg","video":"/media/CACHE/images/lovie1_main/2627bce2d98aab8d4424dd0003b4cb27.jpg","medium":"/media/CACHE/images/lovie1_main/938f131efcde7684832f71925734ceaa.jpg","small":"/media/CACHE/images/lovie1_main/7fe3c555cd1e9eea62196d30a9268efa.jpg","thumbnail":"/media/CACHE/images/lovie1_main/47b47019df31d72d7873539ce1699f75.jpg"},"link":"http://www.lovieletters.eu/","background_colour":"#8b636c","tint_colour":"#6d4a52","text_colour":"#ffffff"},{"id":1,"slug":"resident-advisor","title":"Resident Advisor","introduction":"A new visual identity & platform re-design for club culture’s favourite online magazine","description_headline":"The changing face of music","description_text":"Resident Advisor (RA) is an online music magazine dedicated to showcasing electronic music, artists and events across the globe. Throughout the project, we worked collaboratively and strategically with the inspirational management of RA who develop the entire site in-house.\r\n\r\nHow we access, consume and interact with music has changed radically since RA’s launch in 2001 and the new site acknowledges this through its responsive design, an emphasis on de-cluttering & simplifying the interface, by the evolution of the brand and by focussing on bringing RA’s exceptional, exclusive content to the fore.\r\n\r\n","project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/ra_logo_yDhuq2i/33f2afcd57568842e7fb9c1f16538603.jpg","video":"/media/CACHE/images/ra_logo_yDhuq2i/54cdd9c5c8827c01ba5bcbed19bea45e.jpg","medium":"/media/CACHE/images/ra_logo_yDhuq2i/af8ef6b3df931ad922fe133366abc66d.jpg","small":"/media/CACHE/images/ra_logo_yDhuq2i/3770b3824934ecdd2960f83381a5d0c6.jpg","thumbnail":"/media/CACHE/images/ra_logo_yDhuq2i/070423decf37a8e0379fe0fc9d7098ba.jpg"},"overview_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/ra_preview/1520bcc1c3f6c526e8323528c16baa44.jpg","video":"/media/CACHE/images/ra_preview/9abf41ddf945b90f12d59ddc3459d72f.jpg","medium":"/media/CACHE/images/ra_preview/d9627f9fd753e139f5bcb48322c5da9c.jpg","small":"/media/CACHE/images/ra_preview/f56114705f1b37e6ca3b5c209f9f76a2.jpg","thumbnail":"/media/CACHE/images/ra_preview/86014a9d9abc0fcdd9b69c813dd6021e.jpg"},"hero_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/ra1_main/fa8e7e3bdd9127cbf4ea05aee7c5ba13.jpg","video":"/media/CACHE/images/ra1_main/5ef9dc518aecdd6bd0b7d95c1f7c9547.jpg","medium":"/media/CACHE/images/ra1_main/3d1781a1a288ff0aad15dad4acf71baa.jpg","small":"/media/CACHE/images/ra1_main/3ae013bd7ab5f16dc470415af8fe8c1b.jpg","thumbnail":"/media/CACHE/images/ra1_main/9dbdb7b75f6e496b317935e97d16a4d9.jpg"},"link":"http://www.residentadvisor.net/","background_colour":"#393a3a","tint_colour":"#5c5c5c","text_colour":"#ffffff"},{"id":2,"slug":"peabody-sales","title":"Peabody Sales","introduction":"Responsive website for the new sales arm of Peabody property","description_headline":"A new paradigm in property sales","description_text":"Peabody is a remarkable organisation, having provided sustainable, affordable, lifetime homes in London for over 150 years. That’s why when we started working with the newly formed Peabody sales team, we knew they would be equally remarkable - investing 100% of profits from the sale residential properties back in to affordable housing & community support services. With such a unique positioning, passionate beliefs and individual approach we were focused from the outset in ensuring this shone through brightly in how the website engages and supports customers.\r\n\r\nTo deliver on this it was essential to understand the tension between Peabody’s social purpose as a registered charity and their new position as a credible - and above all, premium - property sales business. We needed to deliver not just a great search & selection experience for customers, but to follow their journeys from first contact, viewings and throughout the sales process. We also worked alongside Peabody’s partner agency Moore-Wilson, who were engaged to build the site with SOON providing additional creative direction and QA throughout the project.","project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/peabody_logo_2VUDKcu/28d3ecb739c15c26f6a8fcf5f98246fa.jpg","video":"/media/CACHE/images/peabody_logo_2VUDKcu/3ee7e27d2ea882d32a40ad8d74a06ac3.jpg","medium":"/media/CACHE/images/peabody_logo_2VUDKcu/5448446c9dfd6feb1b453b87b119e09c.jpg","small":"/media/CACHE/images/peabody_logo_2VUDKcu/f442ace69d15a78ab881b7d2e02e9e9a.jpg","thumbnail":"/media/CACHE/images/peabody_logo_2VUDKcu/d0e6ed6ffef444e6a42668f21ca6941e.jpg"},"overview_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/peabody_overview/83f6f5b5a8dcece7f408416662b22d92.jpg","video":"/media/CACHE/images/peabody_overview/aa65c25da6db1a9a618c58bbf7667916.jpg","medium":"/media/CACHE/images/peabody_overview/346d327974fa815b1da47d85dc257f0a.jpg","small":"/media/CACHE/images/peabody_overview/baa4b831e81ac19a354b8a55925d969d.jpg","thumbnail":"/media/CACHE/images/peabody_overview/69b5f5916d71a3ee86ec39af73740f3e.jpg"},"hero_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/peabody1_main/3d471cd10db3896e3ec2a387d562f9f6.jpg","video":"/media/CACHE/images/peabody1_main/b0f0330339db753e9aefe43f98d94ae4.jpg","medium":"/media/CACHE/images/peabody1_main/70f3e87b423a8ab27f67d7510fbe1df7.jpg","small":"/media/CACHE/images/peabody1_main/c86d002ee0ec681b14e012250a9b4e9b.jpg","thumbnail":"/media/CACHE/images/peabody1_main/81c81f845c486065446118cbd83ea453.jpg"},"link":"http://www.peabodysales.co.uk/","background_colour":"#eee5d8","tint_colour":"#dbd4ca","text_colour":"#000000"},{"id":6,"slug":"we-all-need-words","title":"We All Need Words","introduction":"The anti-branding branding people get a new website, with words in it","description_headline":"Please leave your brand onion at the door","description_text":"We All Need Words are the branding agency for people who hate the cludge of buzzwords and haze of process that stifles and misdirects how brands are expressed. They are also extremely funny and entertaining people which makes them a pleasure to work with. As an agency, they believe strongly in the power of the written word as a means to express brand personality. So we created a site that lives up to that vision - and celebrates the written word beyond all else. Inspired by \"Layout No.1\" the site deliberately treats the pages like a piece of print design. Bold type, texture and clean lines are order of the day.","project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/wanw_logo_SCTR5Zl/042660b45a37cbc675ad5458207033fd.jpg","video":"/media/CACHE/images/wanw_logo_SCTR5Zl/556e96cf7639a633fd8d0a3d0c68485f.jpg","medium":"/media/CACHE/images/wanw_logo_SCTR5Zl/4eff8820d6fd5c00dde61274dca3c5d9.jpg","small":"/media/CACHE/images/wanw_logo_SCTR5Zl/42f220f30fb2ceaf13ceacb3b1218088.jpg","thumbnail":"/media/CACHE/images/wanw_logo_SCTR5Zl/09d41f647ddcd18c05930d5045082b3e.jpg"},"overview_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/wanw_preview/0c8fbe3c09691720d459514aef3ce2a5.jpg","video":"/media/CACHE/images/wanw_preview/a35662f01c93201dc71e12d2e9d50ea7.jpg","medium":"/media/CACHE/images/wanw_preview/55c7b59d050e5284d981ae78d12bc8c0.jpg","small":"/media/CACHE/images/wanw_preview/50bc88050b4ae294c4fa232792cfb966.jpg","thumbnail":"/media/CACHE/images/wanw_preview/34b8710734ef78256475b0e311179c53.jpg"},"hero_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/wanw1_main/5772b60280f3e8d3c1867236b9d8a181.jpg","video":"/media/CACHE/images/wanw1_main/a1106593a75fd63f2716293fdab7d3d7.jpg","medium":"/media/CACHE/images/wanw1_main/1d8825db735a9a0dc1a3c14b3df5874a.jpg","small":"/media/CACHE/images/wanw1_main/a1127702c3440331b0359fdbc0f1c5d8.jpg","thumbnail":"/media/CACHE/images/wanw1_main/a01524f09ab7db4fb17ee0dd89b86bbb.jpg"},"link":"","background_colour":"#ffffee","tint_colour":"#ffff8d","text_colour":"#000000"},{"id":5,"slug":"coffee-stops-awards","title":"Coffee Stops Awards","introduction":"Brewing up London’s first ever awards just for coffee shops","description_headline":"Coffee is the new rock & roll","description_text":"The fast growing and exciting coffee shop scene is part of what makes London one of the coolest cities in the world. And despite there being a number of awards for coffee & coffee roasters, there is no UK awards for where the rubber meets the road: the coffee shops themselves.\r\n\r\nThis project started as the brainchild of serial entrepreneur and coffee shop enthusiast Chris Ward, author of the book Out Of Office and creator of the recent viral hit The Coffee Stops Tube Map. An initial conversation evolved in to a hack-day in a coffee shop, then transformed in to a hectic, caffeine fuelled hack-week, finally finishing up as a major London awards, being presented by ITV newsreader Alastair Stewart and covered on local TV.","project_logo":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/coffee_logo_Nkop3GL/1395188ab71b5d0f0aaead54b6573b9d.jpg","video":"/media/CACHE/images/coffee_logo_Nkop3GL/36d4c7cc54978875c8b2164bce179cf5.jpg","medium":"/media/CACHE/images/coffee_logo_Nkop3GL/a272f136582db9662dd7fe9cb583932c.jpg","small":"/media/CACHE/images/coffee_logo_Nkop3GL/03b51b9d2a9a33c73fdf35b327895603.jpg","thumbnail":"/media/CACHE/images/coffee_logo_Nkop3GL/b448335fcc3e1d23898969f199105543.jpg"},"overview_image":{"caption":"","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/coffee_preview/17dce4064da48fc87cd0f19564c16cc9.jpg","video":"/media/CACHE/images/coffee_preview/5ce9662f3d1c113226225807a2963b01.jpg","medium":"/media/CACHE/images/coffee_preview/eca7fa4af9fb0016d9d6736180619597.jpg","small":"/media/CACHE/images/coffee_preview/43c4c2d773fe6eaf5c99bb688ef14f46.jpg","thumbnail":"/media/CACHE/images/coffee_preview/255919e92dc083efb7d40fef5f8259c6.jpg"},"hero_image":{"caption":"Designed primarily as a mobile experience but also embedded into people's social feed","text_colour":"#000000","background_colour":"#000000","huge":"/media/CACHE/images/coffee1_main/7d30a9c18ab29bc7b373c568f1d0bdd8.jpg","video":"/media/CACHE/images/coffee1_main/ef3015879f6192b0576ce2ea8b4b6e35.jpg","medium":"/media/CACHE/images/coffee1_main/917ae6bbefd26c7b4b827cae142fd18d.jpg","small":"/media/CACHE/images/coffee1_main/aa6b195e5ca860b431d2e960121b2870.jpg","thumbnail":"/media/CACHE/images/coffee1_main/9e23e8bdff7db3c78d80189cd0b617cd.jpg"},"link":"","background_colour":"#eefcff","tint_colour":"#e0eef2","text_colour":"#000000"}]});

            return deferred.promise;
        };

        /**
         * Retrieves a object that contains the list of projects
         * and a sticky project
         * @function getCategories
         * @return   {Promise} A promise that will resolve if the project
         *                   exists or be rejected if it does not
         * @example
         * ThisisssoonAPI.getCategories()
         *     .then(function(categoriesObj){
         *         console.log(categoriesObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Project Found")
         *         // error handling code
         *     })
         */
        this.getCategories = function getCategories(){
            var deferred = $q.defer();

//            $http.get(ENV.API_ADDRESS + "categories/")
//                .success(function (data) {
//                    deferred.resolve(data);
//                })
//                .error(function (data) {
//                    deferred.reject(data);
//                });
            deferred.resolve({});

            return deferred.promise;
        };

        /**
         * Retrieves a object that contains the list of jobs
         * @function getJobs
         * @return   {Promise} A promise that will resolve if jobs
         *                   exist or be rejected if it does not
         * @example
         * ThisisssoonAPI.getJobs()
         *     .then(function(jobsObj){
         *         console.log(jobsObj)
         *         // Do something with project object here
         *     })
         *     .catch(function(){
         *         console.log("No Jobs Found")
         *         // error handling code
         *     })
         */
        this.getJobs = function getCategories(){
            var deferred = $q.defer();

//            $http.get(ENV.API_ADDRESS + "jobs/")
//                .success(function (data) {
//                    deferred.resolve(data);
//                })
//                .error(function (data) {
//                    deferred.reject(data);
//                });
            deferred.resolve({});

            return deferred.promise;
        };


    }
]);
