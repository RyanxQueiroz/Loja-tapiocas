package com.netolanches.Tapiocas

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

@Entity
@Table(name = "filings")
data class Filings(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,
  val idFood: Int,
  val name: String,
  val price: Float
)

interface FilingsRepository : JpaRepository<Filings, Int> {

  @Query("SELECT name, price FROM filings WHERE idfood = :id", nativeQuery = true)
  fun getAllFilingsByFoodId(@Param("id") id: Int): List<Map<String, Any>>
}
