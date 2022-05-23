var A = ['__','__','__']
var B = ['__','__','__']
var N = ['__','__','__','__']
function ChangeCell (idInput,valueInput) {
    var id = String('c'+document.getElementById(idInput).value).toLowerCase();
    var value = String(document.getElementById(valueInput).value);

    if (id.length == 3) {
        document.getElementById(idInput).style.backgroundColor = '#131516';
        document.getElementById(idInput).style.color = '#d8d4cf';
    } else {
        document.getElementById(idInput).style.backgroundColor = '#600';
        id = '__';
    }
    if (value.length == 2) {
        document.getElementById(valueInput).style.backgroundColor = '#131516';
        document.getElementById(valueInput).style.color = '#d8d4cf';
    } else if (value.toLowerCase() != 'test') {
            document.getElementById(valueInput).style.backgroundColor = '#600';
            value = '__';
    }

    switch (id) {
        case 'ca1':
            A[0]=value;
            break;
        case 'ca2':
            A[1]=value;
            break;
        case 'ca3':
            A[2]=value;
            break;
        case 'cb1':
            B[0]=value;
            break;
        case 'cb2':
            B[1]=value;
            break;
        case 'cb3':
            B[2]=value;
            break;
    }

    Load();
}

function Calc () {
    if (A[0]  != '__' || A[1] != '__') {
        A[2] = A[0].charAt(Math.floor(Math.random()*2)) + A[1].charAt(Math.floor(Math.random()*2))
    }
    if (B[0] != '__' || B[1] != '__') {
        B[2] = B[0].charAt(Math.floor(Math.random()*2)) + B[1].charAt(Math.floor(Math.random()*2))
    }
    if (A[2] != '__' || B[2] != '__') {
        N[0] = A[2].charAt(0) + B[2].charAt(0)
        N[1] = A[2].charAt(0) + B[2].charAt(1)
        N[2] = A[2].charAt(1) + B[2].charAt(0)
        N[3] = A[2].charAt(1) + B[2].charAt(1)
    }
    
    if (A[0] =='test') {
        A = ['AA','aa','__']
        B = ['BB','bb','__']
        N = ['__','__','__','__']
    }

    Load()
    console.log('A:'+A)
    console.log('B:'+B)
    console.log('N:'+N)
}

function Load () {
    setTimeout(()=>{document.getElementById('ca1').querySelector('p').innerHTML = A[0];},100);
    setTimeout(()=>{document.getElementById('ca2').querySelector('p').innerHTML = A[1];},100);
    setTimeout(()=>{document.getElementById('ca3').querySelector('p').innerHTML = A[2];},100);

    setTimeout(()=>{document.getElementById('cb1').querySelector('p').innerHTML = B[0];},100);
    setTimeout(()=>{document.getElementById('cb2').querySelector('p').innerHTML = B[1];},100);
    setTimeout(()=>{document.getElementById('cb3').querySelector('p').innerHTML = B[2];},100);

    setTimeout(()=>{document.getElementById('cn').querySelector('p').innerHTML = `${N[0]}, ${N[1]}, ${N[2]} e ${N[3]}.`;},200);
}

function Reset () {
    A = ['__','__','__']
    B = ['__','__','__']
    N = ['__','__','__','__']
    Load()
}

function GuiaGo () {

}

function Relax () {
    document.getElementById('audioCard').style.display='grid';
}
