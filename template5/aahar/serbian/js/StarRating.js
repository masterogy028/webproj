class StarRating extends HTMLElement {
    get value () {
        return this.getAttribute('value') || 0;
    }

    set value (val) {
        this.setAttribute('value', val);
        this.highlight(this.value - 1);
    }

    get number () {
        return this.getAttribute('number') || 5;
    }

    set number (val) {
        this.setAttribute('number', val);

        this.stars = [];

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        for (let i = 0; i < this.number; i++) {
            let s = document.createElement('div');
            s.className = 'star';
            this.appendChild(s);
            this.stars.push(s);
        }

        this.value = this.value;
    }

    highlight (index) {
        this.stars.forEach((star, i) => {
            star.classList.toggle('full', i <= index);
        });
    }

    constructor () {
        super();

        this.number = this.number;

        this.addEventListener('mousemove', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.highlight(starIndex);
        });

        this.addEventListener('mouseout', () => {
            this.value = this.value;
        });

        this.addEventListener('click', e => {
            let box = this.getBoundingClientRect(),
                starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

            this.value = starIndex + 1;
            var str=JSON.parse(localStorage.getItem('restoran'));
            //alert(str.prosekOcena);
            var prs=parseFloat((parseFloat(str.prosekOcena)*parseInt(str.brOcena)))+parseInt(this.value);
            prs=(prs/(str.brOcena+1));str.brOcena++;
            str.prosekOcena=prs;
            /////(str.prosekOcena);
            //var restorani=JSON.parse(localStorage.getItem('mainJson'));
            //restorani.dorcol[0]=str;
            checkAndSet(str);
            ///////////////////////////////////
            localStorage.setItem('restoran',JSON.stringify(str));
            //localStorage.setItem('mainJson',JSON.stringify(restorani));
            let rateEvent = new Event('rate');
            this.dispatchEvent(rateEvent);
        });
        function checkAndSet(restoran){
            var restorani=JSON.parse(localStorage.getItem('mainJson'));
            for(var i=0;i<restorani.dorcol.length;i++){
                if(restorani.dorcol[i].Naziv==restoran.Naziv){
                    restorani.dorcol[i]=restoran;
                    localStorage.setItem('mainJson',JSON.stringify(restorani));
                    //return;
                }
            }
            for(var i=0;i<restorani.vozdovac.length;i++){
                if(restorani.vozdovac[i].Naziv==restoran.Naziv){
                    restorani.vozdovac[i]=restoran;
                    localStorage.setItem('mainJson',JSON.stringify(restorani));
                    //return;
                }
            }
            for(var i=0;i<restorani.zvezdara.length;i++){
                if(restorani.zvezdara[i].Naziv==restoran.Naziv){
                    restorani.zvezdara[i]=restoran;
                    localStorage.setItem('mainJson',JSON.stringify(restorani));
                    //return;
                }
            }
            for(var i=0;i<restorani.stari_grad.length;i++){
                //alert('as');
                if(restorani.stari_grad[i].Naziv==restoran.Naziv){
                    
                    restorani.stari_grad[i]=restoran;
                    localStorage.setItem('mainJson',JSON.stringify(restorani));
                    //return;
                }
            }
            for(var i=0;i<restorani.vracar.length;i++){
                if(restorani.vracar[i].Naziv==restoran.Naziv){
                    restorani.vracar[i]=restoran;
                    localStorage.setItem('mainJson',JSON.stringify(restorani));
                    //return;
                }
            }
        }
    }
}

customElements.define('x-star-rating', StarRating);