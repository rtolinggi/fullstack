import mongoose from "mongoose";

const monitoringNewSchema = mongoose.Schema(
  {
    branch: {
      type: String,
    },
    pos: {
      type: String,
    },
    collector: {
      type: String,
    },
    koordinator: {
      type: String,
    },
    agreementNo: {
      type: String,
    },
    customerName: {
      type: String,
    },
    kecamatan: {
      type: String,
    },
    kelurahan: {
      type: String,
    },
    tenor: {
      type: Number,
    },
    installmentNo: {
      type: Number,
    },
    dueDate: {
      type: Date,
    },
    instAmt: {
      type: Number,
    },
    osBalance: {
      type: Number,
    },
    ovdAwal: {
      type: Number,
    },
    bucketAwal: {
      type: String,
    },
    ovdAkhir: {
      type: Number,
    },
    bucketAkhir: {
      type: String,
    },
    amtDueAwal: {
      type: Number,
    },
    minPayment: {
      type: Number,
    },
    collected: {
      type: Number,
    },
    osAkhir: {
      type: Number,
    },
    collectedAll: {
      type: Number,
    },
    posisiBucket: {
      type: String,
    },
    klasifikasi: {
      type: String,
    },
    problem: {
      type: String,
    },
    detailKronologis: {
      type: String,
    },
    nextPlanDate: {
      type: String,
    },
    actionDate: {
      type: String,
    },
    jlhVisit: {
      type: Number,
    },
    jlhJb: {
      type: Number,
    },
    jlhVisitViaFak: {
      type: Number,
    },
    jlhJbViaFak: {
      type: Number,
    },
    assetCode: {
      type: String,
    },
    noMesin: {
      type: String,
    },
    noRangka: {
      type: String,
    },
    lastPayDate: {
      type: String,
    },
    lastPaymentTrans: {
      type: String,
    },
    lastPayAmt: {
      type: Number,
    },
    isTurunTask: {
      type: Number,
    },
    gCModel: {
      type: String,
    },
    riskModel: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const monitoringNew = mongoose.model("monitoringNew", monitoringNewSchema);

export default monitoringNew;
