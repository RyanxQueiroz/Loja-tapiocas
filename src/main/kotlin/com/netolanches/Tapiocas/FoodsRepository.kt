package com.netolanches.Tapiocas

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.data.jpa.repository.JpaRepository

@Entity
@Table(name = "foods")
data class Foods(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,
  val name: String,
  val price: Float
)

interface FoodsRepository : JpaRepository<Foods, Int>
