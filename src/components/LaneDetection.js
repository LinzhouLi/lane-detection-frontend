class LaneDetection {

    #width;
    #height;
    #maxClientWidth;
    #maxClientHeight;

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.#maxClientWidth = canvas.clientWidth;
        this.#maxClientHeight = canvas.clientHeight;
        this.canvasRatio = this.#maxClientWidth / this.#maxClientHeight;
        this.#width = canvas.width;
        this.#height = canvas.height;

        this.fontSize = 22;

    }

    resize(w, h) {

        let ratio = w / h;
        if (ratio > this.canvasRatio) {
            let height = this.#maxClientWidth / ratio;
            this.canvas.style.height = `${height}px`;
            this.canvas.style.width = `${this.#maxClientWidth}px`;
        }
        else {
            let width = this.#maxClientHeight * ratio;
            this.canvas.style.height = `${this.#maxClientHeight}px`;
            this.canvas.style.width = `${width}px`;
        }
        this.#width = w;
        this.#height = h;
        this.canvas.width = this.#width;
        this.canvas.height = this.#height;

    }

    drawImage(image) {

        this.resize(image.width, image.height);
        this.ctx.drawImage(image, 0, 0);
        this.fontSize = image.height / 40;

    }

    drawVideo(video) {

        this.ctx.drawImage(video, 0, 0);
        this.fontSize = video.clientHeight / 40;

    }

    drawObject(object) {

        // 物体包围框
        this.ctx.strokeStyle = object.color;
        this.ctx.strokeRect(
            object.coords[0],
            object.coords[1],
            object.coords[2] - object.coords[0],
            object.coords[3] - object.coords[1],
        );

        // 文字底色
        this.ctx.font = `${this.fontSize}px sans-serif`;
        let text = this.ctx.measureText(object.text);
        this.ctx.fillStyle = object.color;
        this.ctx.fillRect(object.coords[0], object.coords[1] - this.fontSize, text.width + 2, this.fontSize);

        // 文字填充
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(object.text, object.coords[0] + 1, object.coords[1]);

    }

    fillTest() {

        console.log(this.#width, this.#height)
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.#width, this.#height);

    }

    clear() {

        this.ctx.clearRect(0, 0, this.#width, this.#height);

    }

    resizeToVideo(videoDom) {

        let ratio = videoDom.clientWidth / videoDom.clientHeight;
        let height, width;
        if (ratio > this.canvasRatio) {
            height = this.#maxClientWidth / ratio;
            width = this.#maxClientWidth;
        }
        else {
            width = this.#maxClientHeight * ratio;
            height = this.#maxClientHeight;
        }

        this.canvas.width = this.#width =  videoDom.clientWidth;
        this.canvas.height = this.#height =  videoDom.clientHeight;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

    }

    convertColor(color) {
        return `#${color[0].toString(16)}${color[1].toString(16)}${color[2].toString(16)}`;
    }

    drawYoloObjects(objs) {
        if (!!objs) {
            objs.forEach(item => {
                this.drawObject({
                    coords : item.coords,
                    text: `${item.class} ${item.confidence.toFixed(2)}`,
                    color: this.convertColor(item.color)
                });
            });
        }
    }

    drawPoint(coord) {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(coord[0] - 2, coord[1] - 2, 5, 5);
    }

    drawLanes(lanes) {
        if (!!lanes) {
            lanes.forEach(lane => {
                lane.forEach(coord => {
                    this.drawPoint(coord);
                });
            });
        }
    }

}

export { LaneDetection }