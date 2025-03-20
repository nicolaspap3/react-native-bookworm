import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true,
    set: (val) => {
      if (typeof val === "string") {
        const rawBase64 = val.replace(/data:image\/\w+;base64,/, "")
        return Buffer.from(rawBase64, "base64")
      }
      return val;
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true })

bookSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.image = "data:image/webp;base64" + doc.image.toString("base64")
  }
})

const Book = mongoose.model("Book", bookSchema)

export default Book;