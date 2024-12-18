
const cleanInput = (input: string) => {
    return input.trim().replace(/[^a-zA-Z0-9\s@-_âêôđÁÀẢÃẠẤẦẨẪẬÊẾỀỂỄỆÍÌÍỌÒỎÕỌÔỐỒỔỖỘÚÙỦŨỤƯỨỪỬỮỰÝỲỶỹ]/g, '');
};

export {
    cleanInput
}