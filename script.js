window.addEventListener('load', (event) => {
    // cross-origin frame エラーで制御できない！！
    // top.document.getElementById('warning-bar-table').childNodes[0].childNodes[0].style.display ="none";
    // // フォームの高さを指定（これを入れておかないと初回のアコーディオンアニメーションが効かない）
    // const form = document.getElementById('myFormCondField');
    // form.style.height = form.scrollHeight + 'px';
  });

//   const resize = function(){
//       let timeoutID = 0;
//       let delay = 500;
//       const form = document.getElementById('myFormCondField');
  
//       window.addEventListener("resize", function(){
//           clearTimeout(timeoutID);
//           timeoutID = setTimeout(function(){
  
//             form.style.height = '0px';
//             form.style.height = form.scrollHeight + 'px';
  
//           }, delay);
//       }, false);
//   };
  // resize();


  function btnLogout_onClick() {
    alert('ログアウトボタンを押したね！');
  }

  function actRegist(event) {
    event.preventDefault(); // フォームの送信をキャンセル
    
    const form = document.getElementById('myFormDetail');
    const formData = new FormData(form);

    console.log(JSON.stringify(formData, null,'\t'));
    console.log('ID: ' + formData.get('id'));
    console.log('first_name: ' + formData.get('first_name'));
    
    document.body.style.cursor = 'wait'; // カーソルを砂時計に変える
    const btnRegist = document.getElementById('btnRegist');
    btnRegist.disabled = true;

    fetch('https://script.google.com/macros/s/AKfycbxRMjYnPfphJt8-JfsSs35jlR5BFhlcfLkac2pnFzjMiZCcOcjm8pA2Er695SWGNaFwuQ/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('detail_id').value = data.retID;
      alert(`ID=${data.retID}で登録しました！`);
      btnRegist.disabled = false;
      document.body.style.cursor = 'auto'; // カーソルを元に戻す
    });
  }

  function showDlgDetail(event) {
    event.preventDefault(); // フォームの送信をキャンセル
    const dlg = document.getElementById('dlgDetail');
    dlg.style.display ='flex';
    window.setTimeout(() => {
      dlg.style.opacity = 1;
    }, 10);
    // dlg.classList.add('open');
    // document.getElementById('dlgDetail').style.height = null;
  }
  
  function closeDlgDetail() {
    // event.preventDefault(); // フォームの送信をキャンセル
    const duration = getDuration();
    const dlg = document.getElementById('dlgDetail');
    dlg.style.opacity = 0;
    window.setTimeout(() => {
      dlg.style.display ='none';
    }, duration);
    // dlg.classList.remove('open');
    // document.getElementById('dlgDetail').style.height = null;
  }

  function getDuration() {
    const root = document.querySelector(':root');
    // root.style.setProperty("--transitionDuration", duration + 'ms');
    let durationText = getComputedStyle(root).getPropertyValue("--transitionDuration");
    // console.log(durationText);
    durationText = durationText.replace('ms', '');
    return Number(durationText);

  }

  function toggleCondField() {
    const form = document.getElementById('myFormCondField'); 
    const allow = document.getElementById('condition_allow');
    const duration = getDuration();


    form.classList.toggle('active');

    if(form.classList.contains("active")) {
      form.style.height = form.scrollHeight + 'px';
      window.setTimeout(() => {
        form.style.height = null;
        allow.innerText = '▲';
      }, duration);
    } else {
      form.style.height = form.scrollHeight + 'px';
      // alert(form.style.height);
      // リサイズイベントを発火させるため少し間をおく
      window.setTimeout(() => {
        form.style.height = '0px';
      }, 10);
      window.setTimeout(() => {
        allow.innerText = '▼';
      }, duration);
    }

  }
