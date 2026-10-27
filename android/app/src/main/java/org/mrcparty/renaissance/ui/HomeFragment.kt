package org.mrcparty.renaissance.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.google.android.material.card.MaterialCardView
import org.mrcparty.renaissance.R

class HomeFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mainActivity = activity as? MainActivity ?: return

        view.findViewById<MaterialCardView>(R.id.card_action_my_card).setOnClickListener {
            mainActivity.loadFragment(CardFragment())
        }

        view.findViewById<MaterialCardView>(R.id.card_action_register).setOnClickListener {
            mainActivity.loadFragment(RegisterFragment())
        }

        view.findViewById<MaterialCardView>(R.id.card_action_sentinel).setOnClickListener {
            mainActivity.loadFragment(SentinelFragment())
        }

        view.findViewById<MaterialCardView>(R.id.card_action_donate).setOnClickListener {
            mainActivity.loadFragment(DonateFragment())
        }

        view.findViewById<TextView>(R.id.tv_see_all_news).setOnClickListener {
            mainActivity.loadFragment(NewsFragment())
        }

        view.findViewById<MaterialCardView>(R.id.card_featured_news).setOnClickListener {
            mainActivity.loadFragment(NewsFragment())
        }
    }
}
