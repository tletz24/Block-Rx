const express = require("express");
const db = require("../db");
const router = express.Router();

const demoVaccinationEvent = () => {
				return {
   "vaccinaitionId":"EE1234",
   "patienId":"EE1234",
   "vLocation":"edge",
   "vContraindications":"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
   "vContraindicationsDate":"2018-10-22T11:52:20.182Z",
   "vElegablity":"BlueCrossBlueSheild",
   "vExceptionDate":"2018-10-22T11:52:20.182Z",
   "vExceptionReason":"Sick",
   "vOrgOrigination":"Provider ID",          //IIS-AO ID
   "vOrgSubmitter":"Provider ID",            //IIS-AO ID
   "vAdminDate":"2018-10-22T11:52:20.182Z",
   "vaccinaitionIdSubmitting":"EE1234",
   "vEventType":"administered",
   "vProviderPersonName":"Joe Doe",
   "vProviderPersonSuffix":"RN",
   "vDoseVolume":".5",
   "vDoseVolumeUnits":"ml",
   "vExpirationDate":"2018-10-22T11:52:20.182Z",
   "vFundingSource":"private",
   "vInfoStatementPubDate":"2018-10-22T11:52:20.182Z",
   "vInfoStatementDate":"2018-10-22T11:52:20.182Z",
   "vLotNum":"120020",
   "vMfgName":"Pfizer",
   "vOrderingProvider":"Joe Person MD",
   "vProduct":"162",
   "vRouteOfAdmin":"Injection",
   "vSiteOfAdmin":"Left Arm"
};
};
const parseVaccinationEvent = (obj) => {
        const vaccination = {
            patient_id : obj["vPatientId"],
vLocation : obj["vLocation"],
vContrandication : obj["vContraindications"],
vContraindicationsDate : obj["vContraindicationsDate"],
vElegablity : obj["vElegablity"],
vExceptionDate : obj["vExceptionDate"],
vExceptionReason : obj["vExceptionReason"],
vaccinationId : obj["vaccinaitionId"],
vOrgOrigination:            obj["vOrgOrigination"],
vOrgSubmitter:            obj["vOrgSubmitter"],
vAdminDate:            obj["vAdminDate"],
vaccinationIdSubmitting:            obj["vaccinaitionIdSubmitting"],
vEventType:            obj["vEventType"],
vProviderPersonName:            obj["vProviderPersonName"],
vProviderPersonSuffix:            obj["vProviderPersonSuffix"],
vDoseVolume:           obj["vDoseVolume"],
vDoseVolumeUnits:           obj["vDoseVolumeUnits"],
vExpirationDate:            obj["vExpirationDate"],
vFundingSource:            obj["vFundingSource"],
vInfoStatementPubDate:            obj["vInfoStatementPubDate"],
vInfoStatementDate:            obj["vInfoStatementDate"],
vLotNum:            obj["vLotNum"],
vMfgName:            obj["vMfgName"],
vOrderingProvider:            obj["vOrderingProvider"],
vProduct:            obj["vProduct"],
vRouteofAdmin:            obj["vRouteOfAdmin"],
vSiteofAdmin:            obj["vSiteOfAdmin"]
        };
};

router.get("/:vaccine_id", (req, res, next) => {
				// contact blockchain for vaccination event
				const id = db.ObjectId(req.params.vaccine_id);
				db.vaccinations().findOne({_id:id}, (err, data) => {
								if (err) {
												res.status(500).json({message:"mongodb error: " + err.message});
								}

								res.json({id, data});
				});
});

router.post("/", (req, res, next) => {
        const vaccination_event = parseVaccinationEvent(req.body);
        // pass to the chain
				db.vaccinations().insertOne(demoVaccinationEvent(), (err, data) => {
								if (err) {
												res.status(500).json({message: "mongodb error: " + err.message});
								}

								res.json(data);
				});
});

module.exports = router;
