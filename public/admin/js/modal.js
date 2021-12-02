var modalOpen = document.querySelectorAll('.modal-fn-open')
var modal = document.querySelector('.modal');

var form = document.querySelector('#deleteForm');
var modalClose = document.querySelectorAll('.modal-fn-close');


modalOpen.forEach(el => {
    el.addEventListener('click', (e) => {
        modal.classList.add('show');
        document.querySelector('#deleteId').value = e.target.dataset.id;
    })
})

modalClose.forEach(el => {
    el.addEventListener('click', (e) => {
        modal.classList.remove('show');
        return false;
    })
})
