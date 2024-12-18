package com.netolanches.Tapiocas

import org.springframework.web.bind.annotation.*
import java.math.BigDecimal
import java.time.LocalDate

@CrossOrigin(origins = ["*"])
@RestController
class TapiocasController(
  val foodsRepository: FoodsRepository,
  val fillingsRepository: FilingsRepository,
  val salesRepository: SalesRepository
) {

  @GetMapping("/food")
  fun getFillingsByFoodId(@RequestParam("id") id: Int = 0): Map<String, Any> {
    return try {
      val food = foodsRepository.findById(id).orElseThrow { Exception("Food not found") }
      val fillings = fillingsRepository.getAllFilingsByFoodId(id)

      mapOf(
        "price" to food.price,
        "fillings" to fillings
      )
    } catch (e: Exception) {
      mapOf("error" to e.message.toString())
    }
  }

  @PostMapping("/payment")
  fun processPayment(@RequestBody paymentRequest: PaymentRequest): Map<String, Any> {
    return try {
      val newSale = Sales(
        idfood = paymentRequest.idfood,
        cpf = paymentRequest.cpf,
        datesale = LocalDate.now(),
        description = paymentRequest.description,
        price = BigDecimal.valueOf(paymentRequest.price.toDouble())
      )
      salesRepository.save(newSale)

      mapOf("success" to "Payment processed successfully", "saleId" to newSale.id)
    } catch (e: Exception) {
      mapOf("error" to e.message.toString())
    }
  }
}

data class PaymentRequest(
  val idfood: Int,
  val cpf: String,
  val description: String,
  val price: Float
)
