package com.netolanches.Tapiocas

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.LocalDate
import org.springframework.data.jpa.repository.JpaRepository

@Entity
@Table(name = "sales")
data class Sales(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,
  val idfood: Int,
  val cpf: String,
  val datesale: LocalDate,
  val description: String,
  val price: BigDecimal
)

interface SalesRepository : JpaRepository<Sales, Int> {

}
