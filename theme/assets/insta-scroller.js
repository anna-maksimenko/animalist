(function(){
  var Instafeed,root;Instafeed=function(){function Instafeed(params){var option,value;if(this.options={target:"instafeed",get:"popular",resolution:"standard_resolution",sortBy:"most-recent",links:!0,limit:12,mock:!1},"object"==typeof params)for(option in params)value=params[option],this.options[option]=value;this.unique=this._genKey()}return Instafeed.prototype.run=function(){var header,instanceName,script;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&((script=document.createElement("script")).id="instafeed-fetcher",script.src=this._buildUrl(),(header=document.getElementsByTagName("head"))[0].appendChild(script),instanceName="instafeedCache"+this.unique,window[instanceName]=new Instafeed(this.options),window[instanceName].unique=this.unique),!0},Instafeed.prototype.parse=function(response){var anchor,fragment,header,htmlString,image,imageString,images,img,instanceName,reverse,sortSettings,_i,_j,_len,_len1;if("object"!=typeof response){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==response.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,response.meta.error_message),!1;throw new Error("Error from Instagram: "+response.meta.error_message)}if(0===response.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,response),"most-recent"!==this.options.sortBy)switch(reverse="least"===(sortSettings="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"))[0],sortSettings[1]){case"random":response.data.sort(function(){return.5-Math.random()});break;case"recent":response.data=this._sortBy(response.data,"created_time",reverse);break;case"liked":response.data=this._sortBy(response.data,"likes.count",reverse);break;case"commented":response.data=this._sortBy(response.data,"comments.count",reverse);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(document.getElementById(this.options.target).innerHTML="",(images=response.data).length>this.options.limit&&(images=images.slice(0,this.options.limit+1||9e9)),null!=this.options.template&&"string"==typeof this.options.template){for(htmlString="",imageString="",_i=0,_len=images.length;_i<_len;_i++)image=images[_i],htmlString+=imageString=this._makeTemplate(this.options.template,{model:image,id:image.id,link:image.link,image:image.images[this.options.resolution].url,caption:this._getObjectProperty(image,"caption.text"),likes:image.likes.count,comments:image.comments.count,location:this._getObjectProperty(image,"location.name")});document.getElementById(this.options.target).innerHTML=htmlString}else{for(fragment=document.createDocumentFragment(),_j=0,_len1=images.length;_j<_len1;_j++)image=images[_j],(img=document.createElement("img")).src=image.images[this.options.resolution].url,!0===this.options.links?((anchor=document.createElement("a")).href=image.link,anchor.appendChild(img),fragment.appendChild(anchor)):fragment.appendChild(img);document.getElementById(this.options.target).appendChild(fragment)}(header=document.getElementsByTagName("head")[0]).removeChild(document.getElementById("instafeed-fetcher")),instanceName="instafeedCache"+this.unique,window[instanceName]=void 0;try{delete window[instanceName]}catch(e){}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},Instafeed.prototype._buildUrl=function(){var base,endpoint,final;switch(base="https://api.instagram.com/v1",this.options.get){case"popular":endpoint="media/popular";break;case"tagged":if("string"!=typeof this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");endpoint="tags/"+this.options.tagName+"/media/recent";break;case"location":if("number"!=typeof this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");endpoint="locations/"+this.options.locationId+"/media/recent";break;case"user":if("number"!=typeof this.options.userId)throw new Error("No user specified. Use the 'userId' option.");if("string"!=typeof this.options.accessToken)throw new Error("No access token. Use the 'accessToken' option.");endpoint="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return final=base+"/"+endpoint,null!=this.options.accessToken?final+="?access_token="+this.options.accessToken:final+="?client_id="+this.options.clientId,final+="&count="+this.options.limit,final+="&callback=instafeedCache"+this.unique+".parse"},Instafeed.prototype._genKey=function(){var S4;return""+(S4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+S4()+S4()+S4()},Instafeed.prototype._makeTemplate=function(template,data){var output,pattern,varName,varValue,_ref;for(pattern=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,output=template;pattern.test(output);)varName=output.match(pattern)[1],varValue=null!=(_ref=this._getObjectProperty(data,varName))?_ref:"",output=output.replace(pattern,""+varValue);return output},Instafeed.prototype._getObjectProperty=function(object,property){var piece,pieces;for(pieces=(property=property.replace(/\[(\w+)\]/g,".$1")).split(".");pieces.length;){if(piece=pieces.shift(),!(null!=object&&piece in object))return null;object=object[piece]}return object},Instafeed.prototype._sortBy=function(data,property,reverse){var sorter;return sorter=function(a,b){var valueA,valueB;return valueA=this._getObjectProperty(a,property),valueB=this._getObjectProperty(b,property),reverse?valueA>valueB?1:-1:valueA<valueB?1:-1},data.sort(sorter.bind(this)),data},Instafeed}(),window.Instafeed=Instafeed ;

      async function initInstaScroller() {          
        const $instaScrollerPoints = $('.instagram-scroller-injection-point');
        const $instacont = $('.insta-scroller-to-clone');
        const $insta = $instacont.find('#instafeed');

        function injectionPointsCheck(){
            if ($instaScrollerPoints.length > 0) {
                instaElementSetup();
            } else {
                $insta.remove();
            }
        }

        function instaElementSetup() {
            let feed = new Instafeed({
                get: 'user',
                limit: '20',
                userId: parseFloat($insta.attr('data-user-id')),
                accessToken: $insta.attr('data-access-token'),
              template: '<div class="shg-ig-posts item" data-date="{{model.caption.created_time}}"><a href="{{link}}" target="_blank" class="shg-ig-posts-link"><img src="{{image}}" class="shg-ig-posts-image" /><div class="shg-ig-feed-overlay"><span class="shg-ig-like-count"><svg class="shg-ig-icon shg-ig-icon-heart" viewBox="0 0 17 15" role="presentation"><path d="M15.0349331 1.40485867C14.1287273.49933787 12.9252477 0 11.6443673 0S9.16000731.49933787 8.25448651 1.40417371c-.01164437.01164436-.02328874.02328873-.03493311.03561806-.01164436-.01232933-.02260377-.02328873-.03424813-.0349331C7.2790995.49933787 6.07561989 0 4.79473949 0 3.51385908 0 2.31037947.49933787 1.40417371 1.40485867.49796794 2.31037947 0 3.51385908 0 4.79473949 0 6.07561989.4986529 7.2790995 1.40417371 8.1846203L8.2195534 15l6.8153797-6.8153797c.9055208-.9055208 1.4041737-2.10900041 1.4041737-3.38988081 0-1.28019545-.4986529-2.48436002-1.4041737-3.38988082z"></path></svg>{{likes}}</span><p class="shg-ig-caption">{{caption}}</p><time class="shg-ig-feed-date"></time></div></a></div>',
                after: () => {
                    $insta.removeAttr('id').removeAttr('data-access-token').removeAttr('data-user-id');
                    injectElementToPage();
                }
            });

            feed.run();
        }

        function injectElementToPage() {
            $instaScrollerPoints.map((index, insertPoint) => {
                insertPoint.replaceWith($instacont.children('.shg-ig-x').clone()[0]);
            });
            $instacont.remove();
            $('.shg-ig-posts a .shg-ig-feed-date').each(function(index,item){
              	var currItem = $(item);
                var postDate = new Date(parseInt(currItem.closest('.shg-ig-posts.item').attr('data-date'))*1000);
				currItem.text(postDate.toLocaleDateString({year: 'numeric', month: 'numeric', day: 'numeric'}));
            })
            $('.owl-carousel').owlCarousel({
              stagePadding: 50,
              loop:true,
              dots: false,
              margin:0,
              nav:true,
              autoplayHoverPause: false,
              touchDrag: false,
              responsive:{
                  0:{
                      items:1
                  },
                  600:{
                      items:3
                  },
                  1000:{
                      items:4
                  }
              },
              navText: ['<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.148 10.398l-1.297 1.289q-0.148 0.148-0.352 0.148t-0.352-0.148l-4.148-4.148-4.148 4.148q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.289q-0.148-0.148-0.148-0.355t0.148-0.355l5.797-5.789q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.789q0.148 0.148 0.148 0.355t-0.148 0.355z"></path></svg>','<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.148 10.398l-1.297 1.289q-0.148 0.148-0.352 0.148t-0.352-0.148l-4.148-4.148-4.148 4.148q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.289q-0.148-0.148-0.148-0.355t0.148-0.355l5.797-5.789q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.789q0.148 0.148 0.148 0.355t-0.148 0.355z"></path></svg>']
            });
          $('.owl-carousel').one('click', function(){
          	$('.owl-carousel').trigger('stop.owl.autoplay')
          })
        //   $('.owl-carousel').on('drag.owl.carousel', function(){
        //     	const targetElement = $('.owl-carousel')[0];
        //         bodyScrollLock.disableBodyScroll(targetElement);
        //     $('.owl-carousel').one('dragged.owl.carousel', function(){
        //         bodyScrollLock.enableBodyScroll(targetElement);
        //     })
        //   })
          $('#shopify-section-insta-scroller-section').on('touchstart.hover', '.shg-ig-posts-link', function (e) {
            // e.preventDefault();
            var that = e.currentTarget;
            var clickFlag = true;
            function follow(e) {
                if (clickFlag) {
                    var win = window.open(that.href, '_blank');
                    win.opener = null;
                    win.blur();
                    window.focus();
                }                
            }
            function unHover() {
               $('.shg-ig-feed-overlay').css('opacity', '');
            }
            $(that).find('.shg-ig-feed-overlay').css('opacity', '1');
            setTimeout(function () {
                clickFlag = false
            }, 200);
            $(that).one('touchend', function(e){e.preventDefault()});
            $(that).one('touchend.unhover', unHover);
            $(that).one('touchend.follow', follow);
          })
          $('#shopify-section-insta-scroller-section').on('mouseover.unhover', '.shg-ig-posts-link', function (e) {
              var that = e.currentTarget;
              function unHover() {
                  $('.shg-ig-feed-overlay').css('opacity', '');
              }
              $(that).find('.shg-ig-feed-overlay').css('opacity', '1');
              $(that).one('mouseleave.unhover', unHover);
          })
        }

        injectionPointsCheck();
    }
  
  	async function initIG(){
      await initInstaScroller();      
    }

    $(initIG());
}).call(this);