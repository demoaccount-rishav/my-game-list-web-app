async function deleteProduct(uid) {
    const result = confirm(
        'Are you sure you want to delete this product ?'
    );
    if (result) {
        let result = await fetch('/delete-product/' + uid, { method: 'POST', })
        if (result.ok) {
            window.location.href = "/";
        }
    }
}
